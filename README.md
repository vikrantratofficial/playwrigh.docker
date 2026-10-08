# QA.dev — Freelance Portfolio Website

React + Bootstrap frontend with an Express API backend. All data (projects, blog, contact enquiries, visitor analytics, error logs, admin auth) is stored in MongoDB Atlas.

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

- **MongoDB Atlas** (connection string in `server/.env` as `MONGODB_URI`) holds every collection: `projects`, `blogposts`, `contacts`, `pageviews`, `errorlogs`, `admins`, `loginattempts`.
- Edit projects/blog directly in Atlas, or via the admin API: `POST/PUT/DELETE /api/projects` and `/api/blog` with an `Authorization: Bearer <token>` header from `/api/auth/login`.
- The old `server/data/*.json` files are kept only as a one-time migration source (`node scripts/migrateToMongo.js`) and are no longer read at runtime.
- `server/.env` (holds `MONGODB_URI`, JWT secret, email/reCAPTCHA keys) is **not committed to git**.

## Security features

- 3 failed admin login attempts from the same IP → 15-minute lockout + email alert (if `EMAIL_USER`/`EMAIL_PASS` configured)
- reCAPTCHA v2 on the contact form
- Visitor pageviews + client-side errors logged (IP-based geolocation via offline GeoIP DB) for UX/stability R&D — see `/privacy` for what's collected and why

## Notes

- Set `VITE_API_URL` in `client/.env` if the API is hosted elsewhere than `localhost:5000`.
- For production: change `JWT_SECRET` in `server/.env`, rotate the admin password, and set real `VITE_RECAPTCHA_SITE_KEY` / `RECAPTCHA_SECRET_KEY` values.
- The backend must be deployed somewhere publicly reachable (e.g. Render, Railway) for the live frontend to work for real visitors — a `VITE_API_URL` pointing at `localhost` only works on the machine running the backend.
