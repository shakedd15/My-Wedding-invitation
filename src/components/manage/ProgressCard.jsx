import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function ProgressCard({ percent = 0, loading = false }) {
  const cardRef = useRef(null);
  const fillRef = useRef(null);
  const sheenRef = useRef(null);
  const barPercent = Math.max(0, Math.min(percent, 100));

  useGSAP(
    () => {
      if (loading || !fillRef.current) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduceMotion } = context.conditions;
          const target = barPercent / 100;

          if (reduceMotion) {
            gsap.set(fillRef.current, { scaleX: target });
            return;
          }

          gsap.fromTo(
            fillRef.current,
            { scaleX: 0 },
            { scaleX: target, duration: 0.9, ease: "power2.out" },
          );

          if (sheenRef.current && barPercent > 0) {
            gsap.fromTo(
              sheenRef.current,
              { xPercent: -50 },
              {
                xPercent: 50,
                duration: 1.35,
                ease: "none",
                repeat: -1,
              },
            );
          }
        },
      );

      return () => mm.revert();
    },
    { dependencies: [barPercent, loading], scope: cardRef },
  );

  return (
    <article className="manage-card manage-progress-card" ref={cardRef}>
      <div className="manage-card-copy">
        {loading ? (
          <>
            <div className="manage-skeleton manage-skeleton-value" />
            <div className="manage-skeleton manage-skeleton-label" />
          </>
        ) : (
          <>
            <p className="manage-card-value">{`${percent}%`}</p>
            <h2 className="manage-card-label">קצב ההתקדמות</h2>
          </>
        )}
      </div>
      <div className="manage-progress-track" aria-hidden="true">
        <div className="manage-progress-fill" ref={fillRef}>
          <div className="manage-progress-sheen" ref={sheenRef} />
        </div>
      </div>
    </article>
  );
}
