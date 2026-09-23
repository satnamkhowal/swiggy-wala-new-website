<footer class="sw-footer"><div class="container"><div class="row g-4">
<div class="col-lg-4"><div class="sw-footer-logo" aria-label="Swiggy Wala"></div><p>Jaipur taxi booking, Rajasthan cabs, personalised tours, transfers and travel planning.</p></div>
<div class="col-6 col-lg-2"><h4>Booking</h4><p><a href="/booking.php">Book Taxi</a></p><p><a href="/services.php">Services</a></p><p><a href="/locations.php">Locations</a></p><p><a href="/contact.php">Contact</a></p></div>
<div class="col-6 col-lg-2"><h4>Explore</h4><p><a href="/destinations.php">Destinations</a></p><p><a href="/packages.php">Packages</a></p><p><a href="/gallery/">Gallery</a></p><p><a href="/blog.php">Travel Guides</a></p></div>
<div class="col-lg-2"><h4>Policies</h4><p><a href="/about.php">About</a></p><p><a href="/privacy-policy.php">Privacy Policy</a></p><p><a href="/terms.php">Terms & Conditions</a></p></div>
<div class="col-lg-2"><h4>Contact</h4><p><a href="tel:<?= e(PHONE_TEL) ?>"><?= e(PHONE_DISPLAY) ?></a></p><p><a href="mailto:<?= e(SUPPORT_EMAIL) ?>"><?= e(SUPPORT_EMAIL) ?></a></p><p><?= e(OFFICE_ADDRESS) ?></p></div>
</div><div class="footer-bottom">© <?= date('Y') ?> Swiggy Wala. Taxi availability, fare and travel details should be reconfirmed before booking.</div></div></footer>
<a class="sw-wa-float" href="<?= e(wa_link('Hello Swiggy Wala, I want to book a taxi.')) ?>" target="_blank" rel="noopener"><i class="bi bi-whatsapp"></i><span>WhatsApp</span></a>
<script src="/main-home/assets/js/bootstrap.min.js"></script>
</body></html>
