import { useEffect, useRef, useState } from "react";

import coverAsset from "@/assets/cover-door.jpeg";
import inviteVideo from "@/assets/invite.mp4";

export function Cover({ open, onOpen }: { open: boolean; onOpen: () => void }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Lock page scroll while the cover (image or video) is up, so the site
  // underneath can never be scrolled into view before it's meant to be seen.
  useEffect(() => {
    if (open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const handleTap = async () => {
    const video = videoRef.current;
    if (!video) {
      onOpen();
      return;
    }
    try {
      // Call play() first, synchronously within the click gesture — this is
      // what keeps browsers from blocking autoplay after the tap.
      await video.play();
      setPlaying(true);
    } catch {
      // Autoplay blocked even after the tap — don't strand the guest.
      onOpen();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[999] h-dvh w-dvw bg-black transition-opacity duration-1000 ${
        open ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <img
        src={coverAsset}
        alt="Maroon and gold ornamental invitation cover"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
          playing ? "opacity-0" : "opacity-100"
        }`}
      />

      <video
        ref={videoRef}
        src={inviteVideo}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
          playing ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        playsInline
        controls={false}
        disablePictureInPicture
        onEnded={onOpen}
        onError={onOpen}
      />

      {!playing && (
        <button
          type="button"
          onClick={handleTap}
          className="absolute inset-0 flex items-end justify-center pb-[12vh] focus:outline-none"
          aria-label="Open the invitation"
        >
          <span className="float-slow rounded-full border border-gold/60 bg-maroon-deep/70 px-9 py-4 font-display text-xs tracking-[0.45em] text-gold uppercase backdrop-blur-sm">
            Tap to Open
          </span>
        </button>
      )}
    </div>
  );
}