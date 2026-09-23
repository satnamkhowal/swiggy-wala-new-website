<?php
declare(strict_types=1);
require_once __DIR__ . '/../app/bootstrap.php';

function booking_fail(string $message): never
{
    header('Location: /booking.php?error=' . rawurlencode($message));
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /booking.php');
    exit;
}
if (!sw_installed()) {
    header('Location: /install/');
    exit;
}
if (!sw_verify_csrf($_POST['csrf_token'] ?? null)) {
    booking_fail('Your session expired. Please submit the form again.');
}
if (!empty($_POST['company'])) {
    header('Location: /booking.php?success=1');
    exit;
}
if (isset($_SESSION['last_lead_at']) && time() - (int)$_SESSION['last_lead_at'] < 15) {
    booking_fail('Please wait a few seconds before sending another request.');
}

$clean = static fn(string $key, int $max = 255): string => mb_substr(trim((string)($_POST[$key] ?? '')), 0, $max);
$name = $clean('name', 120);
$phone = preg_replace('/[^0-9+]/', '', $clean('phone', 20));
$email = $clean('email', 190);
$tripType = $clean('trip_type', 60);
$pickup = $clean('pickup', 180);
$dropoff = $clean('dropoff', 180);
$pickupDate = $clean('pickup_date', 10);
$pickupTime = $clean('pickup_time', 8) ?: null;
$returnDate = $clean('return_date', 10) ?: null;
$vehicle = $clean('vehicle', 80);
$notes = $clean('notes', 1000);
$source = $clean('source', 80) ?: 'website';
$passengers = max(1, min(60, (int)($_POST['passengers'] ?? 1)));

if ($name === '' || $tripType === '' || $pickup === '' || $dropoff === '' || $pickupDate === '') {
    booking_fail('Please complete all required booking fields.');
}
if (!preg_match('/^\+?[0-9]{8,15}$/', $phone)) {
    booking_fail('Please enter a valid phone number.');
}
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    booking_fail('Please enter a valid email address.');
}
$today = new DateTimeImmutable('today');
$date = DateTimeImmutable::createFromFormat('Y-m-d', $pickupDate);
if (!$date || $date->format('Y-m-d') !== $pickupDate || $date < $today) {
    booking_fail('Please choose a valid pickup date.');
}
if ($returnDate !== null) {
    $return = DateTimeImmutable::createFromFormat('Y-m-d', $returnDate);
    if (!$return || $return->format('Y-m-d') !== $returnDate || $return < $date) {
        booking_fail('Return date cannot be before pickup date.');
    }
}

try {
    $pdo = sw_db();
    $rate = $pdo->prepare('SELECT COUNT(*) FROM leads WHERE ip_hash = ? AND created_at >= (NOW() - INTERVAL 10 MINUTE)');
    $rate->execute([sw_ip_hash()]);
    if ((int)$rate->fetchColumn() >= 5) {
        booking_fail('Too many requests were sent recently. Please try again later.');
    }

    $reference = 'SW' . date('ymd') . strtoupper(bin2hex(random_bytes(3)));
    $stmt = $pdo->prepare('INSERT INTO leads (reference, name, phone, email, trip_type, pickup, dropoff, pickup_date, pickup_time, return_date, vehicle, passengers, notes, source, status, ip_hash, user_agent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    $stmt->execute([
        $reference, $name, $phone, $email ?: null, $tripType, $pickup, $dropoff, $pickupDate,
        $pickupTime, $returnDate, $vehicle ?: null, $passengers, $notes ?: null, $source, 'new',
        sw_ip_hash(), mb_substr((string)($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 255),
    ]);
    $_SESSION['last_lead_at'] = time();
    header('Location: /booking.php?success=1&ref=' . rawurlencode($reference));
    exit;
} catch (Throwable $e) {
    error_log('Booking lead error: ' . $e->getMessage());
    booking_fail('We could not save your request right now. Please call or WhatsApp us.');
}
