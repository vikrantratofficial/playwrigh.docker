# QA.dev — Freelance Portfolio Website

React + Bootstrap frontend with an Express/JSON API backend.

## Structure

- `client/` — React app (Vite, React Router, React-Bootstrap)
- `server/` — Express API (projects, blog, contact form, JWT admin auth)

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

- `/` — Home (hero, terminal preview, stats, featured projects, CTA)
- `/projects` — Filterable project grid
- `/projects/:id` — Project case study detail
- `/about` — Bio, skills, QA status convention
- `/services` — Service cards + engagement process
- `/blog` — Article listing
- `/blog/:id` — Article detail
- `/contact` — Contact info + form (hits `POST /api/contact`)
- `/admin/login` + `/admin` — JWT-protected dashboard (view projects/blog/messages, delete entries)

## Admin login

Default credentials (change in `server/data/admin.json` — replace `passwordHash` with a new bcrypt hash):
- Username: `admin`
- Password: `admin123`

## Editing content

- Projects: `server/data/projects.json`
- Blog posts: `server/data/blog.json`
- Or use the authenticated API: `POST/PUT/DELETE /api/projects` and `/api/blog` with an `Authorization: Bearer <token>` header from `/api/auth/login`.

## Notes

- Contact form submissions are stored in `server/data/contacts.json` and viewable in the admin dashboard.
- Set `VITE_API_URL` in `client/.env` if the API is hosted elsewhere.
- For production, change `JWT_SECRET` in `server/.env` and the admin password.
