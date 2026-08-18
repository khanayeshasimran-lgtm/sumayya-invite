import { useEffect, useRef, useState } from "react";

type Ctx = { ctx: AudioContext; gain: GainNode; timer: number };

const SCALE = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25];

export function MusicToggle() {
  const ref = useRef<Ctx | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    return () => {
      if (ref.current) {
        window.clearInterval(ref.current.timer);
        ref.current.ctx.close();
        ref.current = null;
      }
    };
  }, []);

  const start = () => {
    const AudioCtor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtor();
    const gain = ctx.createGain();
    gain.gain.value = 0.0001;
    gain.gain.exponentialRampToValueAtTime(0.14, ctx.currentTime + 2);
    const reverb = ctx.createBiquadFilter();
    reverb.type = "lowpass";
    reverb.frequency.value = 2200;
    gain.connect(reverb).connect(ctx.destination);

    let i = 0;
    const pluck = () => {
      const now = ctx.currentTime;
      const note = (SCALE[i % SCALE.length] ?? 440) * (i % 16 < 8 ? 1 : 0.5);
      i += 1 + (Math.random() > 0.75 ? 1 : 0);
      [1, 2.01].forEach((mult, idx) => {
        const osc = ctx.createOscillator();
        const env = ctx.createGain();
        osc.type = idx === 0 ? "triangle" : "sine";
        osc.frequency.value = note * mult;
        env.gain.setValueAtTime(0.0001, now);
        env.gain.exponentialRampToValueAtTime(idx === 0 ? 0.5 : 0.16, now + 0.05);
        env.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);
        osc.connect(env).connect(gain);
        osc.start(now);
        osc.stop(now + 3.4);
      });
    };
    pluck();
    const timer = window.setInterval(pluck, 1200);
    ref.current = { ctx, gain, timer };
    setPlaying(true);
  };

  const stop = () => {
    const cur = ref.current;
    if (!cur) return;
    window.clearInterval(cur.timer);
    cur.gain.gain.exponentialRampToValueAtTime(0.0001, cur.ctx.currentTime + 0.8);
    window.setTimeout(() => cur.ctx.close(), 1000);
    ref.current = null;
    setPlaying(false);
  };

  return (
    <button
      type="button"
      onClick={() => (playing ? stop() : start())}
      aria-label={playing ? "Pause ambient music" : "Play ambient music"}
      className="fixed right-4 bottom-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-maroon-deep/80 text-gold shadow-[0_10px_30px_-10px_rgba(0,0,0,0.9)] backdrop-blur transition hover:bg-maroon/90"
    >
      <span className={playing ? "float-slow" : ""}>{playing ? "❙❙" : "♪"}</span>
    </button>
  );
}