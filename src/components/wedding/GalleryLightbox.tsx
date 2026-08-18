import { useEffect } from "react";

type Item = { src: string; caption: string };

export function GalleryLightbox({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: Item[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const open = index !== null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex(((index as number) + 1) % items.length);
      if (e.key === "ArrowLeft") onIndex(((index as number) - 1 + items.length) % items.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, index, items.length, onClose, onIndex]);

  if (!open) return null;
  const item = items[index as number];
  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.caption}
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-ivory/97 px-4 py-10 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close gallery"
        onClick={onClose}
        className="absolute top-5 right-5 rounded-full border border-gold-deep/50 px-4 py-2 font-display text-[0.6rem] tracking-[0.3em] text-gold-deep uppercase transition hover:bg-maroon hover:text-cream"
      >
        Close
      </button>

      <img
        src={item.src}
        alt={item.caption}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[78vh] w-auto max-w-full rounded-2xl border border-gold-deep/30 object-contain shadow-[0_40px_100px_-40px_rgba(90,20,30,0.5)]"
      />
      <p className="mt-5 font-display text-[0.65rem] tracking-[0.35em] text-gold-deep uppercase">
        {item.caption}
      </p>

      <div className="mt-6 flex items-center gap-4" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          aria-label="Previous image"
          onClick={() => onIndex(((index as number) - 1 + items.length) % items.length)}
          className="rounded-full border border-gold-deep/50 px-5 py-2 font-display text-[0.6rem] tracking-[0.3em] text-gold-deep uppercase transition hover:bg-maroon hover:text-cream"
        >
          Prev
        </button>
        <span className="font-body text-xs tracking-[0.25em] text-maroon-ink/70">
          {(index as number) + 1} / {items.length}
        </span>
        <button
          type="button"
          aria-label="Next image"
          onClick={() => onIndex(((index as number) + 1) % items.length)}
          className="rounded-full border border-gold-deep/50 px-5 py-2 font-display text-[0.6rem] tracking-[0.3em] text-gold-deep uppercase transition hover:bg-maroon hover:text-cream"
        >
          Next
        </button>
      </div>
    </div>
  );
}