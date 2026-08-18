import { useEffect, useRef, useState } from "react";

export function ScratchCard({ image }: { image: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  const drawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const paint = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.scale(dpr, dpr);
      const g = ctx.createLinearGradient(0, 0, rect.width, rect.height);
      g.addColorStop(0, "#4a0d16");
      g.addColorStop(0.45, "#6d1420");
      g.addColorStop(1, "#3d0a12");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, rect.width, rect.height);
      ctx.strokeStyle = "rgba(212,175,93,0.35)";
      ctx.lineWidth = 2;
      ctx.strokeRect(14, 14, rect.width - 28, rect.height - 28);
      ctx.fillStyle = "rgba(226,196,124,0.9)";
      ctx.textAlign = "center";
      ctx.font = "500 13px Cinzel, serif";
      ctx.fillText("SCRATCH TO REVEAL", rect.width / 2, rect.height / 2 - 10);
      ctx.font = "400 26px 'Great Vibes', cursive";
      ctx.fillText("Save the Date", rect.width / 2, rect.height / 2 + 26);
    };

    paint();
    window.addEventListener("resize", paint);
    return () => window.removeEventListener("resize", paint);
  }, []);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(clientX - rect.left, clientY - rect.top, 34, 0, Math.PI * 2);
    ctx.fill();

    const dpr = window.devicePixelRatio || 1;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let clear = 0;
    const step = 16 * Math.max(1, Math.round(dpr));
    let total = 0;
    for (let i = 3; i < data.length; i += 4 * step) {
      total++;
      if (data[i] === 0) clear++;
    }
    if (total && clear / total > 0.45) setRevealed(true);
  };

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto aspect-[2/3] w-full max-w-sm overflow-hidden rounded-[1.75rem] border border-gold-deep/40 shadow-[0_30px_80px_-30px_rgba(90,20,30,0.45)]"
    >
      <img
        src={image}
        alt="Save the date invitation for Tanveer Fatima Khanam and Adnan Shareef, 31 August 2026"
        loading="lazy"
        className="h-full w-full object-cover"
      />
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full cursor-grab touch-none transition-opacity duration-700 ${
          revealed ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        onPointerDown={(e) => {
          drawing.current = true;
          scratch(e.clientX, e.clientY);
        }}
        onPointerMove={(e) => {
          if (drawing.current) scratch(e.clientX, e.clientY);
        }}
        onPointerUp={() => (drawing.current = false)}
        onPointerLeave={() => (drawing.current = false)}
      />
    </div>
  );
}