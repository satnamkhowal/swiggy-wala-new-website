<?php
$source = $source ?? 'website';
$compact = $compact ?? false;
?>
<form class="sw-booking-form" method="post" action="/api/book.php" novalidate>
  <input type="hidden" name="csrf_token" value="<?= sw_e(sw_csrf_token()) ?>">
  <input type="hidden" name="source" value="<?= sw_e($source) ?>">
  <div class="sw-honeypot" aria-hidden="true"><label>Company <input type="text" name="company" tabindex="-1" autocomplete="off"></label></div>
  <div class="row g-3">
    <div class="col-md-6">
      <label class="form-label" for="trip_type">Trip type *</label>
      <select class="form-select" id="trip_type" name="trip_type" required>
        <option value="">Select trip</option>
        <option>Airport Transfer</option>
        <option>Jaipur Local Taxi</option>
        <option>One Way Outstation</option>
        <option>Round Trip Outstation</option>
        <option>Multi City</option>
      </select>
    </div>
    <div class="col-md-6">
      <label class="form-label" for="vehicle">Vehicle</label>
      <select class="form-select" id="vehicle" name="vehicle">
        <option value="">Any suitable vehicle</option>
        <option>Sedan</option>
        <option>SUV</option>
        <option>Tempo Traveller</option>
        <option>Other</option>
      </select>
    </div>
    <div class="col-md-6">
      <label class="form-label" for="pickup">Pickup *</label>
      <input class="form-control" id="pickup" name="pickup" maxlength="180" placeholder="Pickup location" required>
    </div>
    <div class="col-md-6">
      <label class="form-label" for="dropoff">Drop *</label>
      <input class="form-control" id="dropoff" name="dropoff" maxlength="180" placeholder="Destination" required>
    </div>
    <div class="col-md-4">
      <label class="form-label" for="pickup_date">Pickup date *</label>
      <input class="form-control" type="date" id="pickup_date" name="pickup_date" min="<?= date('Y-m-d') ?>" required>
    </div>
    <div class="col-md-4">
      <label class="form-label" for="pickup_time">Pickup time</label>
      <input class="form-control" type="time" id="pickup_time" name="pickup_time">
    </div>
    <div class="col-md-4">
      <label class="form-label" for="return_date">Return date</label>
      <input class="form-control" type="date" id="return_date" name="return_date" min="<?= date('Y-m-d') ?>">
    </div>
    <div class="col-md-6">
      <label class="form-label" for="name">Name *</label>
      <input class="form-control" id="name" name="name" maxlength="120" autocomplete="name" required>
    </div>
    <div class="col-md-3">
      <label class="form-label" for="phone">Phone *</label>
      <input class="form-control" id="phone" name="phone" maxlength="20" inputmode="tel" autocomplete="tel" required>
    </div>
    <div class="col-md-3">
      <label class="form-label" for="passengers">Passengers</label>
      <input class="form-control" type="number" id="passengers" name="passengers" min="1" max="60" value="1">
    </div>
    <?php if (!$compact): ?>
    <div class="col-md-6">
      <label class="form-label" for="email">Email</label>
      <input class="form-control" type="email" id="email" name="email" maxlength="190" autocomplete="email">
    </div>
    <div class="col-md-6">
      <label class="form-label" for="notes">Special requirement</label>
      <input class="form-control" id="notes" name="notes" maxlength="1000" placeholder="Flight number, child seat, luggage, stops, etc.">
    </div>
    <?php endif; ?>
    <div class="col-12 d-grid">
      <?php if (sw_installed()): ?>
        <button class="sw-btn border-0" type="submit"><i class="bi bi-taxi-front"></i> Request Taxi Booking</button>
      <?php else: ?>
        <a class="sw-btn" href="/install/"><i class="bi bi-gear"></i> Configure Website First</a>
      <?php endif; ?>
    </div>
  </div>
  <p class="sw-form-note">Submitting this form sends your trip request to the Swiggy Wala lead panel. A team member can contact you to confirm availability and trip details.</p>
</form>
