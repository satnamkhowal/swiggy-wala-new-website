# Swiggy Wala taxi-booking installation

The website is a multi-page PHP site with taxi booking as the primary conversion objective. The installer adds the MySQL-backed booking workflow and the admin lead panel without removing the existing services, destinations, packages, locations, blogs or migrated content.

## Requirements

- PHP 8.1+ with PDO MySQL and mbstring
- MySQL 5.7+ / compatible MariaDB
- Apache with `.htaccess` enabled
- HTTPS recommended

## Hostinger setup

1. Deploy the repository to the domain document root.
2. In Hostinger, create an empty MySQL database and database user.
3. Make sure `/app` is temporarily writable by PHP so the installer can create `app/config.php`.
4. Open `https://your-domain.com/install/`.
5. Enter database credentials, site URL, business name/phone/email and the first lead-panel administrator account.
6. Click **Install & Configure**. The installer creates `admins`, `leads` and `settings`, then writes `app/config.php`.
7. Open `https://your-domain.com/admin/` and sign in.
8. Keep `app/config.php` private. The included `.htaccess` blocks direct web access to `/app/`; recommended permission is `0640` where supported.

## Main URLs

- `/` — taxi-first homepage with booking form
- `/booking.php` or `/book-taxi` — full taxi request form
- `/services.php` — services
- `/destinations.php` — destinations
- `/packages.php` — tour packages
- `/locations.php` — Jaipur branch network
- `/blog.php` — travel guides
- `/install/` — one-time database/site/admin configuration
- `/admin/` — lead dashboard
- `/admin/export.php` — filtered CSV export

## Lead workflow

The form stores trip type, pickup/drop, pickup/return date, pickup time, vehicle preference, passenger count, customer name/phone, optional email/notes, source and status. New leads start as `new`. Admin users can search/filter leads, move them through `new`, `contacted`, `quoted`, `confirmed`, `completed` or `cancelled`, and export CSV.

## Security included

Prepared PDO statements, password hashing, CSRF protection, session regeneration, honeypot and submission throttling, HMAC-hashed IP rate limiting, CSV formula-injection protection, protected config paths and no hard-coded default admin password.
