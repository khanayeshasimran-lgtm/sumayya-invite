import { useState } from "react";

const ICS = [
  "BEGIN:VCALENDAR",
  "VERSION:2.0",
  "PRODID:-//Tanveer & Adnan//Wedding//EN",
  "CALSCALE:GREGORIAN",
  "BEGIN:VEVENT",
  "UID:nikah-tanveer-adnan@wedding",
  "DTSTAMP:20260101T000000Z",
  "DTSTART:20260828T080000Z",
  "DTEND:20260828T183000Z",
  "SUMMARY:Nikah & Reception — Tanveer Fatima Khanam & Adnan Shareef",
  "LOCATION:Masjid-e-Abubakar Siddiq, Toli Chowki, Hyderabad / United Palace, Attapur Ring Road",
  "DESCRIPTION:Nikah after Namaz-e-Juma. Barat & Welcome 8:00 pm, Reception & Dinner 9:00 pm.",
  "END:VEVENT",
  "BEGIN:VEVENT",
  "UID:valima-tanveer-adnan@wedding",
  "DTSTAMP:20260101T000000Z",
  "DTSTART:20260831T153000Z",
  "DTEND:20260831T183000Z",
  "SUMMARY:Valima Dinner — Tanveer Fatima Khanam & Adnan Shareef",
  "LOCATION:Legacy Palace, Pillar No. 96, Zoo Park Road, Tadban, Bahadurpura, Hyderabad",
  "DESCRIPTION:Valima Dinner at 9:00 pm, Insha Allah.",
  "END:VEVENT",
  "END:VCALENDAR",
].join("\r\n");

function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

const BTN =
  "inline-flex items-center justify-center gap-2 rounded-full border border-gold-deep/60 px-6 py-3 font-display text-[0.62rem] tracking-[0.3em] text-gold-deep uppercase transition hover:bg-maroon hover:text-cream";

export function InviteActions({ image }: { image: string }) {
  const [busy, setBusy] = useState(false);

  const downloadInvite = async () => {
    setBusy(true);
    try {
      const res = await fetch(image, { mode: "cors" });
      const blob = await res.blob();
      saveBlob(blob, "Tanveer-Adnan-Invitation.jpg");
    } catch {
      window.open(image, "_blank", "noreferrer");
    } finally {
      setBusy(false);
    }
  };

  const shareWhatsApp = () => {
    const text = `Bismillah 🌙 You are cordially invited to the wedding of Tanveer Fatima Khanam & Adnan Shareef.\nNikah: Friday, 28 August 2026 — after Namaz-e-Juma, Masjid-e-Abubakar Siddiq, Toli Chowki.\nValima: Monday, 31 August 2026 — 9:00 pm, Legacy Palace, Hyderabad.\nInvitation: ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noreferrer");
  };

  return (
    <div className="mt-7 flex flex-wrap justify-center gap-3">
      <button type="button" className={BTN} onClick={() => saveBlob(new Blob([ICS], { type: "text/calendar;charset=utf-8" }), "tanveer-adnan-wedding.ics")}>
        Add to Calendar
      </button>
      <button type="button" className={BTN} onClick={downloadInvite} disabled={busy}>
        {busy ? "Preparing…" : "Download Invite"}
      </button>
    </div>
  );
}