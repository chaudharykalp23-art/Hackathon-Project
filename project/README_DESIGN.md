# Stitch-style GlobeTrotter UI

These files replace the frontend UI in the previously generated GlobeTrotter project.

## Replace
Copy:
- `src/App.jsx`
- `src/styles.css`

Keep the existing:
- `src/main.jsx`
- `src/api.js`
- `package.json`

## Routes
- `/login`
- `/signup`
- `/dashboard`
- `/trips`
- `/create-trip`
- `/itinerary`
- `/cities`
- `/profile`

## Run
From `frontend`:
```powershell
npm install
npm run dev
```

The login page has a demo fallback so the visual UI can be tested even before the backend/MySQL is configured. Once the backend works, it uses `/api/auth/login` and `/api/auth/signup`.
