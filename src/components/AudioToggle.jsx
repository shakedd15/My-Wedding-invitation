/**
 * Floating, permanent mute/unmute control (styled like the reference's play
 * button) fixed to the bottom corner. Stateless: the parent owns the <audio>
 * element and the on/off state. `isOn` = music currently audible.
 */
export default function AudioToggle({ isOn, onToggle, labels }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isOn}
      aria-label={isOn ? labels.pause : labels.play}
      className="fixed bottom-6 left-6 z-[60] grid h-12 w-12 place-items-center rounded-full border border-gold/50 bg-cream/70 text-gold shadow-[0_6px_18px_rgba(120,90,50,0.25)] backdrop-blur-md transition-transform duration-200 active:scale-90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold/40"
    >
      {isOn ? (
        // Speaker with sound waves (unmuted)
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" stroke="none" />
          <path d="M16.5 8.5a5 5 0 0 1 0 7" />
          <path d="M19 6a8 8 0 0 1 0 12" />
        </svg>
      ) : (
        // Muted speaker (sound off)
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" stroke="none" />
          <line x1="16" y1="9" x2="21" y2="14" />
          <line x1="21" y1="9" x2="16" y2="14" />
        </svg>
      )}
    </button>
  );
}
