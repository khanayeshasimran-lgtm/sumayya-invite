import { useEffect, useState } from "react";

const TARGET = new Date("2026-08-28T13:30:00+05:30").getTime();

function parts(ms: number) {
  const clamp = Math.max(0, ms);
  return {
    Days: Math.floor(clamp / 86400000),
    Hours: Math.floor(clamp / 3600000) % 24,
    Minutes: Math.floor(clamp / 60000) % 60,
    Seconds: Math.floor(clamp / 1000) % 60,
  };
}

export function Countdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const t = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, []);

  const value = parts(TARGET - (now ?? TARGET));

  return (
    <div className="mx-auto grid max-w-2xl grid-cols-4 gap-3 sm:gap-6">
      {Object.entries(value).map(([label, n]) => (
        <div
          key={label}
          className="rounded-2xl border border-gold-deep/30 bg-white/70 px-2 py-5 text-center backdrop-blur-sm sm:py-7"
        >
          <div className="font-display text-2xl text-gold-gradient sm:text-4xl">
            {now === null ? "--" : String(n).padStart(2, "0")}
          </div>
          <div className="mt-2 font-body text-[0.6rem] tracking-[0.35em] text-maroon-ink/70 uppercase">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}