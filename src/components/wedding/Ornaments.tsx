import bouquet from "@/assets/bouquet.png";

export function Divider({ label }: { label?: string }) {
  return (
    <div className="mx-auto flex max-w-md items-center gap-4 py-6">
      <span className="gold-rule flex-1" />
      <span className="font-display text-[0.7rem] tracking-[0.4em] text-gold-deep uppercase">
        {label ?? "❦"}
      </span>
      <span className="gold-rule flex-1" />
    </div>
  );
}

export function Bouquet({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <img
      src={bouquet}
      alt=""
      aria-hidden="true"
      loading="lazy"
      width={1024}
      height={1024}
      className={`pointer-events-none absolute select-none opacity-90 ${flip ? "-scale-x-100" : ""} ${className}`}
    />
  );
}

export function SectionTitle({
  kicker,
  title,
  script,
}: {
  kicker?: string;
  title: string;
  script?: string;
}) {
  return (
    <div className="text-center">
      {kicker && (
        <p className="font-display text-[0.65rem] tracking-[0.55em] text-gold-deep/85 uppercase">
          {kicker}
        </p>
      )}
      <h2 className="mt-3 font-display text-3xl tracking-[0.18em] text-gold-gradient sm:text-4xl">
        {title}
      </h2>
      {script && (
        <p className="mt-2 font-script text-2xl text-gold-deep/90 sm:text-3xl">{script}</p>
      )}
      <Divider />
    </div>
  );
}