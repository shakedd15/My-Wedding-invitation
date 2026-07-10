import { useRef, useState, useCallback, useEffect, useMemo } from "react";
import Envelope from "./components/Envelope.jsx";
import AudioToggle from "./components/AudioToggle.jsx";
import WelcomeSection from "./components/WelcomeSection.jsx";
import DateSection from "./components/DateSection.jsx";
import WaveDivider from "./components/WaveDivider.jsx";
import CountdownSection from "./components/CountdownSection.jsx";
import ScheduleSection from "./components/ScheduleSection.jsx";
import VenueSection from "./components/VenueSection.jsx";
import { useLanguage } from "./hooks/useLanguage.js";
import { ASSETS } from "./constants/config.js";
import MenuSection from "./components/MenuSection.jsx";
import RsvpSection from "./components/RsvpSection.jsx";
import ClosingSection from "./components/ClosingSection.jsx";
import { useGuest } from "./hooks/useGuest.js";
import { supabase } from "./lib/supabase.js";

function useUrlParams() {
  return useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      guestId: params.get("id"),
      page: params.get("page"),
    };
  }, []);
}

export default function App() {
  const { copy } = useLanguage("he");
  const { guestId, page } = useUrlParams();

  /* ── Supabase: fetch guest data for the personalized RSVP ── */
  const { guest, loading: guestLoading, error: guestError } = useGuest(guestId);

  /* ── RSVP handlers — update the guests table ── */
  const handleAttend = useCallback(async (confirmedCount) => {
    if (!guestId) return;
    const { error } = await supabase
      .from("guests")
      .update({ guests_amount_arriving: confirmedCount })
      .eq("id", guestId);
    if (error) throw error;
  }, [guestId]);

  const handleDecline = useCallback(async () => {
    if (!guestId) return;
    const { error } = await supabase
      .from("guests")
      .update({ guests_amount_arriving: 0 })
      .eq("id", guestId);
    if (error) throw error;
  }, [guestId]);

  const audioRef = useRef(null);
  const [isOn, setIsOn] = useState(false);

  // Attempt autoplay on mount. Most browsers block unmuted autoplay until the
  // user interacts — that's expected; the wax-seal tap (startMusic) guarantees
  // playback, and the floating toggle is always available as a fallback.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio
      .play()
      .then(() => setIsOn(true))
      .catch(() => setIsOn(false));
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

  const showMenu = page === "menu";

  return (
    <>
      {/* ── Menu section — visible only when ?page=menu is present ── */}
      {showMenu ? (
        <div id="menu-section">
          <MenuSection />
        </div>
      ) : (
        /* ── Landing page — shown for all visitors, including those with ?id= ── */
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
          <WaveDivider from="rgb(217, 234, 245)" to="#edf5fa" />

          {/* ── Stage 3: Schedule of Events ── */}
          <ScheduleSection />

          {/* ── Stage 4: Venue / Location ── */}
          <VenueSection />

          {/* ── Stage 5: RSVP ── */}
          <RsvpSection
            guestName={guest?.full_name ?? null}
            gender={guest?.gender ?? "F"}
            maxGuests={guest?.guests_max_amount ?? 3}
            defaultGuests={guest?.guests_amount_arriving > 0 ? guest.guests_amount_arriving : 1}
            guestLoading={guestLoading}
            guestError={guestError}
            onAttend={handleAttend}
            onDecline={handleDecline}
          />

          {/* ── Stage 6: Closing photo ── */}
          <ClosingSection />

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
      )}
    </>
  );
}
