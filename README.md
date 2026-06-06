# הזמנה דיגיטלית לחתונה · Digital Wedding Invitation

Premium, **mobile-first** digital wedding invitation built for sharing over WhatsApp.
Phase 1: architecture, localization, the sealed-envelope landing, the GSAP opening
animation, and local background-audio wiring.

## Tech stack

- **React** (functional components + hooks, JavaScript)
- **Vite** (dev server + build)
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **GSAP** + **@gsap/react** (`useGSAP`) for the opening timeline

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

## Project structure

```
public/
  audio/                # drop wedding-song.mp3 here (see audio/README.md)
  images/wax-seal.svg   # wax-seal artwork (interlocking-rings placeholder)
src/
  constants/
    translations.js     # TRANSLATIONS dictionary (he/en) — ALL UI text lives here
    config.js           # asset paths + animation timings
  hooks/
    useLanguage.js      # active language + <html lang/dir> sync (defaults 'he')
  components/
    Envelope.jsx        # landing view + GSAP opening timeline (the orchestrator)
    WaxSeal.jsx         # interactive seal button (tap to open)
    InvitationCard.jsx  # the card revealed after opening (placeholder fields)
    AudioToggle.jsx     # floating play/pause music control
  App.jsx               # composes everything; owns the <audio> element
  index.css             # Tailwind + design tokens (@theme) + viewport lock
```

## Localization (Strict Constants Pattern)

- **No hardcoded UI strings in components.** Every label is read from
  `src/constants/translations.js` via the `useLanguage()` hook.
- The dictionary is split by view: `envelope` (live) and `card` (placeholders).
- Default language is **Hebrew (`he`)**; an `en` skeleton mirrors the structure.

### Filling in the invitation details later

Edit `TRANSLATIONS.he.card` in `src/constants/translations.js`. Empty strings
render nothing, so the card layout stays clean until you add content, e.g.:

```js
card: {
  groomName: "דניאל",
  brideName: "נועה",
  inviteLine: "מתכבדים להזמינכם לחתונתם",
  date: { label: "התאריך", day: "יום חמישי", gregorian: "12.08.2026", time: "קבלת פנים 19:00" },
  location: { label: "המקום", venue: "אחוזת השמש", address: "הזית 10, הרצליה", mapUrl: "https://maps.google.com/...", mapButton: "פתחו ניווט" },
  rsvp: { prompt: "נשמח לדעת אם תגיעו", attendingButton: "מגיעים", notAttendingButton: "לא נוכל להגיע" },
}
```

## Audio

Mobile browsers block autoplay, so playback starts on the **wax-seal tap**
(the user gesture). Place your track at `public/audio/wedding-song.mp3`
(path configured in `src/constants/config.js`). A floating toggle
(bottom corner) mutes/unmutes at any time.

## Animation notes

- A single **paused GSAP timeline** is built inside `useGSAP` (auto cleanup on
  unmount — no memory leaks) and `.play()`-ed on tap.
- Hardware-accelerated only: animates **transform / autoAlpha** (no layout props).
- Respects **`prefers-reduced-motion`** (reveal becomes instant).

## Next phase (backend)

The frontend is modular and data-driven. A future **Python (FastAPI/Flask)**
service can serve the `card` content and receive RSVP submissions; swap the
static `TRANSLATIONS`/`config` values for fetched data without touching layout.
