# Audio

Place your background track here as:

```
public/audio/wedding-song.mp3
```

The path is referenced from `src/constants/config.js` (`ASSETS.audioSrc`).
`.mp3` is the most mobile-friendly format; `.m4a` / `.mp4` audio also work.

Mobile browsers block autoplay, so playback is triggered by the user's
tap on the wax seal (see `Envelope.jsx`).
