# f2 Frontend

Frontend for f2, a room booking app — browse rooms, book time slots, manage your bookings, and (for admins) manage rooms and bookings across users.

Built with React, Vite, Redux Toolkit, and React Router. Talks to a REST API (expected at `http://localhost:5000/api/v1` by default, see [src/api/axios.js](src/api/axios.js)) for auth and booking data.

## Features

- Login / register with JWT auth
- Browse rooms and view a room's booking calendar
- Book a room for a time slot
- View and manage your own bookings
- Admin pages for managing rooms and all bookings

## Getting started

```bash
npm install
npm run dev
```

Requires the f2 API running locally (or update the `baseURL` in [src/api/axios.js](src/api/axios.js) to point elsewhere).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint
