import { useRef, useState, useCallback, useEffect } from "react";
import Envelope from "./components/Envelope.jsx";
import AudioToggle from "./components/AudioToggle.jsx";
import WelcomeSection from "./components/WelcomeSection.jsx";
import DateSection from "./components/DateSection.jsx";
import WaveDivider from "./components/WaveDivider.jsx";
import CountdownSection from "./components/CountdownSection.jsx";
import LetterSection from "./components/LetterSection.jsx";
import { useLanguage } from "./hooks/useLanguage.js";
import { ASSETS } from "./constants/config.js";

export default function App() {
  // Language selector lives here; defaults to Hebrew ('he').
  const { copy } = useLanguage("he");

  const audioRef = useRef(null);
  const [isOn, setIsOn] = useState(false); // is the music currently audible?

  // Attempt autoplay on mount. Most browsers block unmuted autoplay until the
  // user interacts — that's expected; the wax-seal tap (startMusic) guarantees
  // playback, and the floating toggle is always available as a fallback.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio
      .play()
      .then(() => setIsOn(true))
      .catch(() => setIsOn(false)); // blocked — wait for a user gesture
  }, []);

  // Fired on the wax-seal tap (a real user gesture) so mobile browsers allow it.
  const startMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = false;
    audio
      .play()
      .then(() => setIsOn(true))
      .catch(() => setIsOn(false));
  }, []);

  // Permanent mute/unmute control.
  const toggleSound = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.muted = false;
      audio.play().then(() => setIsOn(true)).catch(() => {});
    } else {
      audio.pause();
      setIsOn(false);
    }
  }, []);

  return (
    <main className="page-wrapper">
      {/* ── Stage 1: Full-viewport envelope (100dvh, overflow hidden) ── */}
      <Envelope copy={copy} onSealTap={startMusic} />

      {/* ── Stage 2: Welcome message + flowers ── */}
      <WelcomeSection />

      {/* ── Stage 3: The Date ── */}
      <DateSection copy={copy} />

      {/* ── Divider: Date → Countdown ── */}
      <WaveDivider />

      {/* ── Stage 2.5: Countdown Timer ── */}
      <CountdownSection />

      {/* ── Divider: Countdown → Letter ── */}
      <WaveDivider from="rgb(217, 234, 245)" to="#edf5fa" flip />

      {/* ── Stage 3: The Letter ── */}
      <LetterSection copy={copy} />

      {/* Native HTML5 audio. `autoPlay` is attempted; see useEffect above. */}
      <audio
        ref={audioRef}
        src={ASSETS.audioSrc}
        autoPlay
        loop
        preload="auto"
        playsInline
        onPlay={() => setIsOn(true)}
        onPause={() => setIsOn(false)}
      />

      {/* Fixed floating music toggle — survives all scroll. */}
      <AudioToggle isOn={isOn} onToggle={toggleSound} labels={copy.audio} />
    </main>
  );
}
