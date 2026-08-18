
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import arch from "@/assets/arch-maroon.jpg";
import bgGeometric from "@/assets/bg-geometric.jpg";
import bgFloral from "@/assets/bg-floral.jpg";
import bgMarble from "@/assets/bg-marble.jpg";
import invite from "@/assets/invite.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import saveTheDate from "@/assets/save-the-date.jpeg";
import { Bouquet, Divider, SectionTitle } from "@/components/wedding/Ornaments";
import { Cover } from "@/components/wedding/Cover";
import { Countdown } from "@/components/wedding/Countdown";
import { MusicToggle } from "@/components/wedding/MusicToggle";
import { ScratchCard } from "@/components/wedding/ScratchCard";
import { InviteActions } from "@/components/wedding/InviteActions";
import { GalleryLightbox } from "@/components/wedding/GalleryLightbox";
import { useReveal } from "@/components/wedding/useReveal";

const TITLE = "Tanveer Fatima Khanam & Adnan Shareef — Wedding Invitation";
const DESC =
  "Join us for the Nikah on Friday, 28 August 2026 in Toli Chowki and the Valima on Monday, 31 August 2026 at Legacy Palace, Hyderabad.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const TIMELINE = [
  {
    day: "Friday · 28 August 2026",
    title: "Nikah Ceremony",
    time: "After Namaz-e-Juma",
    place: "Masjid-e-Abubakar Siddiq, Al-Hasnath Colony, Toli Chowki, Hyderabad",
    note: "14th Rabi-ul-Awwal 1448 Hijri — the sacred covenant, witnessed with duas.",
  },
  {
    day: "Friday · 28 August 2026",
    title: "Barat & Welcome",
    time: "8:00 p.m. onwards",
    place: "United Palace, Pillar No. 245, Attapur Ring Road, Hyderabad",
    note: "Rose petals, gold lanterns and the warmest welcome of our lives.",
  },

  {
    day: "Monday · 31 August 2026",
    title: "Valima Dinner",
    time: "9:00 p.m.",
    place: "Legacy Palace, Pillar No. 96, Zoo Park Road, Tadban, Bahadurpura, Hyderabad",
    note: "The Sunnah feast of gratitude, hosted with love by the groom's family.",
  },
  {
    day: "Insha Allah",
    title: "A Lifetime Together",
    time: "Forever after",
    place: "Wherever their journey leads",
    note: "May Allah make their union a source of peace, mercy and endless mercy.",
  },
];

const GALLERY = [
  { src: g1, caption: "Henna & Heirlooms" },
  { src: g2, caption: "The Banquet Awaits" },
  { src: g3, caption: "Lantern Light" },
  { src: g4, caption: "Blessings from the Qur'an" },
  { src: g5, caption: "Golden Hour Vows" },
  { src: g6, caption: "Family & Blessings" },
];

// Controls the ASYNC APPEARANCE ORDER only (grid position stays fixed 1..6,
// laid out row-by-row in a normal 2-col x 3-row reading order).
// Appearance sequence requested: 1, 3, 2, 5, 4, 6 (1-based) -> 0-based grid indices below.
const REVEAL_ORDER = [0, 2, 1, 4, 3, 5];
const REVEAL_STEP_MS = 150;

function revealDelay(gridIndex: number) {
  return REVEAL_ORDER.indexOf(gridIndex) * REVEAL_STEP_MS;
}

function Index() {
  return <IndexPage />;
}

function SectionBg({ src, opacity = 0.14 }: { src: string; opacity?: number }) {
  return (
    <>
      <img
        src={src}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{ opacity }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ivory via-ivory/70 to-ivory" />
    </>
  );
}

function IndexPage() {
  const [open, setOpen] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  useReveal();

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-ivory font-body text-maroon-ink">
      <Cover open={open} onOpen={() => setOpen(true)} />
      <MusicToggle />

{/* 1 — Invitation Image */}
<section id="invite" className="relative h-screen w-full overflow-hidden">
  <img
    src={invite}
    alt="Tanveer Fatima Khanam & Adnan Shareef — Wedding Invitation"
    className="h-full w-full object-cover object-center"
  />

  {/* Scroll Indicator Overlay */}
  <a
    href="#save-the-date"
    aria-label="Scroll to Save The Date"
    className="animate-bounce-subtle absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 rounded-full bg-maroon/40 px-4 py-2 backdrop-blur-md transition-all duration-300 hover:bg-maroon/70 hover:scale-105"
  >
    <span className="font-body text-[0.6rem] tracking-[0.3em] text-cream uppercase">
      Scroll Down
    </span>
    {/* Mouse / Pill Icon with animated dot */}
    <div className="flex h-7 w-4 justify-center rounded-full border border-gold/70 p-1">
      <div className="h-1.5 w-1 rounded-full bg-gold animate-bounce" />
    </div>
  </a>
</section>

      {/* 2 — Save the Date scratch card + families */}
      <section id="save-the-date" className="relative bg-ivory px-5 py-24">
        <SectionBg src={bgFloral} opacity={0.18} />
        <div className="relative z-10 mx-auto max-w-5xl">
          <SectionTitle kicker="With the blessings of the Almighty" title="SAVE THE DATE" script="Scratch to reveal" />
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="reveal">
              <ScratchCard image={saveTheDate} />
<InviteActions image={saveTheDate} />
            </div>
            <div className="reveal space-y-5 text-center md:text-left">
              <p className="font-serif text-lg text-maroon-ink/80 italic">
                “Two souls, one dua, written in the heavens long before it was written on paper.”
              </p>
              <div className="gold-rule" />
              <p className="font-body text-sm tracking-wide text-maroon-ink/75">
                With the blessings of{" "}
                <span className="text-gold-deep">Late Mrs. &amp; Mr. Mohammed Roshan Khan Sahab</span>
              </p>
              <p className="font-display text-lg tracking-[0.12em] text-gold-gradient">
                Mrs. &amp; Mr. Mohammed Aquil Khan
              </p>
              <p className="font-body text-xs tracking-[0.2em] text-maroon-ink/65 uppercase">
                Retd. Project Manager, Al-Zamil Co. K.S.A
              </p>
              <p className="font-serif text-base text-maroon-ink/80">
                solicit your gracious presence on the auspicious occasion of the marriage ceremony
                of their daughter <span className="text-gold-deep">Tanveer Fatima Khanam, M.Sc</span>{" "}
                with <span className="text-gold-deep">Adnan Shareef, M.S (USA)</span>, Sr. Data
                Engineer, Dallas (USA), S/o Mr. Late Baquer Shareef Sahab.
              </p>
              <p className="font-script text-2xl text-gold-deep">Insha Allah</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — Gallery */}
      <section id="gallery" className="relative bg-ivory px-5 py-24">
        <SectionBg src={bgMarble} opacity={0.35} />
        <Bouquet className="top-6 -left-20 w-52 opacity-70" />
        <Bouquet className="right-[-6rem] bottom-[-2.5rem] w-52 opacity-80" flip />
        <div className="relative z-10 mx-auto max-w-5xl">
<SectionTitle
  kicker="HER SPECIAL DAY"
  title="HER MOMENT"
  script="Yet to unfold"
/>
          <div className="grid grid-cols-2 grid-rows-3 gap-y-1 p-0">
            {GALLERY.map((item, i) => {
              const rotations = [
                "-rotate-2",
                "rotate-1",
                "rotate-2",
                "-rotate-1",
                "rotate-1",
                "-rotate-2",
              ];
              return (
                <figure
                  key={item.caption + i}
                  className={`reveal group relative cursor-zoom-in bg-cream p-2 pb-4 shadow-[0_6px_18px_-6px_rgba(60,20,20,0.45)] transition-transform duration-500 hover:z-20 hover:scale-105 hover:rotate-0 ${rotations[i]}`}
                  style={{ animationDelay: `${revealDelay(i)}ms` }}
                  onClick={() => setLightbox(i)}
                >
                  <div className="overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.caption}
                      loading="lazy"
                      width={800}
                      height={1000}
                      className="h-40 w-full object-cover sm:h-56"
                    />
                  </div>
                </figure>
              );
            })}
          </div>

          <p className="reveal mt-6 text-center font-body text-[0.6rem] tracking-[0.3em] text-gold-deep/70 uppercase">
            Tap any photo to view full screen
          </p>
          <p className="reveal mx-auto mt-10 max-w-2xl text-center font-serif text-lg text-maroon-ink/80 italic">
            “And of His signs is that He created for you from yourselves mates that you may find
            tranquillity in them; and He placed between you affection and mercy.” — Qur'an 30:21
          </p>
        </div>
      </section>

      {/* 4 — Timeline & Location */}
      <section id="celebrations" className="relative bg-ivory px-5 py-24">
        <SectionBg src={bgGeometric} opacity={0.16} />
        <div className="relative z-10 mx-auto max-w-3xl">
          <SectionTitle kicker="Nikah · Reception · Valima" title="EVENT TIMELINE" script="Insha Allah" />
          <ol className="relative space-y-10 pl-10 sm:pl-14">
            <span
              aria-hidden="true"
              className="absolute top-3 bottom-3 left-[0.68rem] w-px sm:left-[1.18rem]"
              style={{
                background:
                  "linear-gradient(180deg, transparent, var(--color-gold) 12%, var(--color-gold-deep) 50%, var(--color-gold) 88%, transparent)",
              }}
            />
            {TIMELINE.map((e, i) => (
              <li key={e.title} className="reveal relative" style={{ animationDelay: `${i * 90}ms` }}>
                <span
                  aria-hidden="true"
                  className="absolute top-2 -left-10 flex h-6 w-6 items-center justify-center sm:-left-14"
                >
                  <span className="pulse-ring absolute h-6 w-6 rounded-full border border-gold-deep/60" />
                  <span className="pulse-ring pulse-ring-delay absolute h-6 w-6 rounded-full border border-gold/70" />
                  <span className="absolute h-4 w-4 rounded-full border border-gold-deep/50 bg-ivory" />
                  <span
                    className="dot-vibe relative h-2 w-2 rounded-full bg-gold-deep"
                    style={{ boxShadow: "0 0 10px 2px color-mix(in oklab, var(--color-gold) 70%, transparent)" }}
                  />
                </span>
                <div className="rounded-2xl border border-gold/40 bg-maroon/92 p-5 backdrop-blur-sm transition duration-500 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_18px_40px_-24px_rgba(60,20,20,0.55)] sm:p-6">
                  <p className="font-body text-[0.65rem] tracking-[0.35em] text-gold-soft/85 uppercase">
                    {e.day}
                  </p>
                  <h3 className="mt-1 font-display text-xl tracking-[0.12em] text-gold-gradient">
                    {e.title}
                  </h3>
                  <p className="mt-1 font-serif text-lg text-cream/90">{e.time}</p>
                  <p className="mt-1 font-body text-sm text-cream/80">{e.place}</p>
                  <span className="gold-rule mt-3 block" />
                  <p className="mt-3 font-serif text-base text-cream/75 italic">{e.note}</p>
                </div>
              </li>
            ))}
          </ol>

          <Divider label="Venues" />
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              {
                name: "United Palace",
                sub: "Reception & Dinner · 28 Aug 2026",
                addr: "Pillar No. 245, Attapur Ring Road, Hyderabad",
                map: "https://www.google.com/maps/search/?api=1&query=United+Palace+Attapur+Ring+Road+Pillar+245+Hyderabad",
              },
              {
                name: "Legacy Palace",
                sub: "Valima Dinner · 31 Aug 2026",
                addr: "Pillar No. 96, Zoo Park Road, Tadban, Bahadurpura, Hyderabad",
                map: "https://www.google.com/maps/search/?api=1&query=Legacy+Palace+Zoo+Park+Road+Tadban+Bahadurpura+Hyderabad",
              },
            ].map((v) => (
              <div
                key={v.name}
                className="reveal rounded-2xl border border-gold/40 bg-maroon/92 p-6 text-center backdrop-blur-sm"
              >
                <h3 className="font-display text-lg tracking-[0.15em] text-gold-gradient">
                  {v.name}
                </h3>
                <p className="mt-1 font-body text-[0.65rem] tracking-[0.3em] text-gold-soft/85 uppercase">
                  {v.sub}
                </p>
                <p className="mt-3 font-serif text-base text-cream/85">{v.addr}</p>
                <a
                  href={v.map}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-block rounded-full border border-gold/60 px-6 py-2.5 font-display text-[0.65rem] tracking-[0.35em] text-gold uppercase transition hover:bg-cream hover:text-maroon"
                >
                  Open in Maps
                </a>
              </div>
            ))}
          </div>
          <p className="reveal mt-10 text-center font-serif text-lg text-maroon-ink/80 italic">
            “Nikah is my Sunnah, and whoever turns away from my Sunnah is not of me.” — Prophet
            Muhammad ﷺ
          </p>
        </div>
      </section>

      {/* 5 — Countdown & Your Presence */}
      <section id="presence" className="relative overflow-hidden bg-ivory px-5 py-24">
        <SectionBg src={arch} opacity={0.12} />
        <Bouquet className="-top-[1rem] -left-[7rem] w-56" />
        <Bouquet className="-right-[7rem] -bottom-[-1rem] w-56" z-index={10} flip />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <SectionTitle kicker="Counting every heartbeat" title="THE COUNTDOWN" script="Until the Nikah" />
          <Countdown />

          <Divider label="Your Presence" />
          <h3 className="font-display text-2xl tracking-[0.18em] text-gold-gradient sm:text-3xl">
            WE LOOK FORWARD
          </h3>
          <p className="mx-auto mt-5 max-w-2xl font-serif text-lg leading-relaxed text-maroon-ink/85">
            Your presence is the most cherished blessing we could ask for. Come with your duas,
            your laughter and your love — and let this maroon-and-gold evening be remembered by
            all of us for a lifetime.
          </p>
          <p className="mt-6 font-script text-3xl text-gold-deep">
            With Best Compliments From : Near &amp; Dear
          </p>
          <p className="mx-auto mt-8 max-w-xl font-serif text-base text-maroon-ink/75 italic">
            “Barak Allahu lakuma wa baraka alaykuma wa jama'a baynakuma fi khayr.” — May Allah
            bless you both, and unite you in goodness.
          </p>
          <Divider />
          <p className="font-body text-[0.65rem] tracking-[0.4em] text-gold-deep/80 uppercase">
            Tanveer &amp; Adnan · Hyderabad · MMXXVI
          </p>
        </div>
      </section>

      <GalleryLightbox
        items={GALLERY}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onIndex={setLightbox}
      />
    </main>
  );
}