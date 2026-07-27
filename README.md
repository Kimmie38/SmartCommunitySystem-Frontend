# SafeGuard — frontend prototype

Smart Community Security and Emergency Response System — resident + admin
frontend, built with Expo SDK 54 and Expo Router. No backend: all data lives
in `data/*.json` and in-memory React Context (`context/AppContext.tsx`), so
everything resets when the app reloads.

## Setup

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go, or press `i` / `a` for a simulator.

## How it works

- **Login screen** has a Resident / Admin toggle. Any email/password gets you
  in — there's no real auth.
- **Resident tabs**: Home, Feed (filter + sort), Report (submit a new
  incident — it appears at the top of the Feed and Home instantly), Alerts,
  Profile.
- **Admin tabs**: Dashboard (stats + needs-attention list), Manage (change any
  report's status: Active → Responding → Resolved), Profile.
- Submitting a report or changing a status updates the shared `AppContext`
  state, so both the resident and admin views reflect it during the session.

## What's mocked vs. real

| Feature | Status |
|---|---|
| Login / register | Accepts anything, no validation |
| Reports feed | Seeded from `data/reports.json`, editable in-session |
| Alerts | Static, from `data/alerts.json` |
| Location / "Nearest" sort | Cosmetic only — no real geolocation |
| Admin status updates | In-memory only, resets on reload |

## Next steps if you want it real

- Swap `AppContext`'s in-memory state for Supabase or a REST API
- Add `expo-location` for real "Nearest" sorting and geofenced alerts
- Add push notifications (`expo-notifications`) for new incidents
- Persist session with `AsyncStorage` so login survives app restarts
