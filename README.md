# ABC AI System Limited — Website

Full Laravel + MySQL recreation of the abcaisystemltd.com corporate site: "Democratizing Artificial Intelligence."

## Requirements

- XAMPP (Apache on port 80 + MySQL on `127.0.0.1:3306`)
- PHP 8.2+ with extensions `pdo_mysql`, `mbstring`, `fileinfo`, `openssl`
- Composer (only needed once to install dependencies)

## Zero-Command Hosting (recommended)

The project is designed to run on any Apache/MySQL host **without typing a single command or port**:

1. Copy the whole project folder into your web root.
   - XAMPP: `F:\xampp\htdocs\AGM_Web_site` (this file is already there).
2. Make sure a `.env` file exists next to this README and set the DB connection:
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=demo
   DB_USERNAME=root
   DB_PASSWORD=
   ```
   (`.env` already exists for this machine. For a fresh copy it contains a valid `APP_KEY` — do not clear it.)
3. Open the site in your browser.

On the **first visit** the app automatically:
- creates the database (if `DB_DATABASE` does not exist yet),
- runs the migrations (`migrate`),
- seeds all content when the database is empty (`db:seed`),
- writes a `.installed` marker so it only happens once.

The root `.htaccess` routes every request through `public/`, and all asset/route URLs are built from the request itself — so it works from any sub-folder or a virtual host root without editing `APP_URL` or any port.

## One-Click Launcher (XAMPP)

Double-click `start.bat` and it will:

- start MySQL and Apache if they are not running,
- create the `agm_web_site` database if missing,
- open the site in your default browser (no port in the URL).

You may still run it manually with `php artisan serve` (port 8000) if preferred.

## Manual Setup (classic)

```bash
composer install
copy .env.example .env      # then set DB_* values
php artisan migrate --force --seed
php artisan serve
```

Open http://127.0.0.1:8000 (or your Apache virtual host).

> Optional: instead of letting the site auto-install, import the ready dump
> `database/agm_web_site.sql` with phpMyAdmin into a database named `agm_web_site`.

## Admin Panel

Log in at `/login`.

- **Email:** `admin@abcaisystemltd.com`
- **Password:** `admin123`

Manage: messages, services, products, team members, clients & pilots, statistics, industries, tech domains, advantages, methodology steps, and site settings (most strings on the public site are editable via settings).

After login, Breeze redirects to `/dashboard`, which shows the same dashboard as `/admin`.

## Routes

| Method | URI | Notes |
| --- | --- | --- |
| GET | `/` | Single-page site: hero, stats, about, services, products, technology, industries, leadership, methodology, contact |
| GET | `/services/{service:slug}` | Service detail page |
| POST | `/contact` | Contact form (saves to `contact_messages`) |
| GET | `/dashboard` | Auth redirect target (admin) |
| GET | `/admin` | Admin dashboard |
| resource | `/admin/{...}` | Admin CRUD (auth + verified) |

Nav anchors (`#about`, `#products`, `#services`, `#technology`, `#leadership`, `#contact`) scroll to each section on the single page.

## Content Model Notes

- `services`, `products`, `team_members`, `statistics`, `industries`, `tech_domains`, `advantages`, `methodologies`, `clients` all have JSON columns (`features`, `benefits`, `usecases`, `stats`, `steps`, `demo`, `tags`, `links`).
- Admin forms for JSON fields accept newline-separated entries; key-value rows use `value | label` (`title | desc`).
- Product `demo` accepts a raw JSON object or key-value lines.
- `services` use the `slug` column as the route key, so admin edit URLs are `/admin/services/{slug}/edit`.

## License

Private project. All rights reserved.
