# QA.dev — Freelance Portfolio Website

React + Bootstrap frontend with an Express API backend. Content and enquiries are stored as plain JSON files; SQLite is used only for admin login (credentials + failed-attempt lockout).

## Structure

- `client/` — React app (Vite, React Router, React-Bootstrap)
- `server/` — Express API (projects, blog, contact form, JWT admin auth, visitor analytics)

## Running locally

**Backend** (port 5000):
```
cd server
npm install
npm run dev
```

**Frontend** (port 5173):
```
cd client
npm install
npm run dev
```

Open http://localhost:5173

## Pages

- `/` — Home (hero, terminal preview, stats, featured projects, sample reports, CTA)
- `/projects` — Filterable project grid
- `/projects/:id` — Project case study detail
- `/about` — Bio, skills, certifications, QA status convention
- `/services` — Service cards + engagement process + FAQ
- `/blog` — Article listing
- `/blog/:id` — Article detail
- `/contact` — Contact info + form (hits `POST /api/contact`) + FAQ
- `/privacy` — Privacy policy
- `/admin/login` + `/admin` — JWT-protected dashboard: visitor map, error logs, projects/blog/messages, profile settings

## Admin login

Current credentials — **change these before going live**:
- Username: `admin`
- Password: set via the Admin → Profile tab (requires current password + a daily OTP = today's date as `YYYYMMDD`)

## Data storage

- **Content & enquiries (plain JSON files in `server/data/`)**: `projects.json`, `blog.json`, `contacts.json`, `analytics.json`, `errors.json`. Edit `projects.json`/`blog.json` directly, or via the admin API: `POST/PUT/DELETE /api/projects` and `/api/blog` with an `Authorization: Bearer <token>` header from `/api/auth/login`.
- **Admin auth only (`server/data/auth.db`, SQLite)**: admin username/email/password hash, and IP-based login lockout state. Nothing else lives here.
- `contacts.json`, `analytics.json`, `errors.json`, and `auth.db` are **not committed to git** (they hold real visitor IPs and messages).

## Security features

- 3 failed admin login attempts from the same IP → 15-minute lockout + email alert (if `EMAIL_USER`/`EMAIL_PASS` configured)
- reCAPTCHA v2 on the contact form
- Visitor pageviews + client-side errors logged (IP-based geolocation via offline GeoIP DB) for UX/stability R&D — see `/privacy` for what's collected and why

## Notes

- Set `VITE_API_URL` in `client/.env` if the API is hosted elsewhere than `localhost:5000`.
- For production: change `JWT_SECRET` in `server/.env`, rotate the admin password, and set real `VITE_RECAPTCHA_SITE_KEY` / `RECAPTCHA_SECRET_KEY` values.
- The backend must be deployed somewhere publicly reachable (e.g. Render, Railway) for the live frontend to work for real visitors — a `VITE_API_URL` pointing at `localhost` only works on the machine running the backend.
