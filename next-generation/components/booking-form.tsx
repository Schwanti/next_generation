"use client";

import { FormEvent, useState } from "react";
import { BOOKING_EMAIL } from "@/lib/constants";

const EVENT_TYPES = [
  "Bierzelt / Kirchweih",
  "Vereinsfeier",
  "Privatfeier / Geburtstag",
  "Fasching / Ball",
  "Brauerei- / Altstadtfest",
  "Sonstiges",
];

// Baut aus den Feldern eine fertige E-Mail. Es wird nichts an einen Server
// gesendet: der Button öffnet das E-Mail-Programm mit der Anfrage.
export function BookingForm() {
  const [opened, setOpened] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const date = get("date")
      ? new Date(get("date") + "T00:00:00").toLocaleDateString("de-DE")
      : "";

    const body = [
      "--- Buchungsanfrage ---",
      "",
      `Name / Verein: ${get("name")}`,
      `Telefon (für Rückfragen): ${get("phone")}`,
      "",
      `Veranstaltungsart: ${get("type")}`,
      `Wunschdatum (ca.): ${date}`,
      `Ort / Location: ${get("location")}`,
      `Gäste (ca.): ${get("guests")}`,
      "",
      "Nachricht / Besondere Wünsche:",
      get("message"),
      "",
      "---",
    ].join("\n");

    const subject = `Buchungsanfrage${get("type") ? ` ${get("type")}` : ""}${date ? ` am ${date}` : ""} - Next Generation`;
    window.location.href = `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit} aria-describedby="booking-form-note">
      <div className="field field--wide">
        <label htmlFor="bf-name">Name oder Verein</label>
        <input id="bf-name" name="name" type="text" autoComplete="name" required />
      </div>
      <div className="field">
        <label htmlFor="bf-type">Veranstaltungsart</label>
        <select id="bf-type" name="type" required defaultValue="">
          <option value="" disabled>Bitte wählen</option>
          {EVENT_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="bf-date">Wunschdatum</label>
        <input id="bf-date" name="date" type="date" />
      </div>
      <div className="field">
        <label htmlFor="bf-location">Ort</label>
        <input id="bf-location" name="location" type="text" autoComplete="address-level2" required />
      </div>
      <div className="field">
        <label htmlFor="bf-guests">Gäste, ungefähr</label>
        <input id="bf-guests" name="guests" type="text" inputMode="numeric" />
      </div>
      <div className="field field--wide">
        <label htmlFor="bf-phone">Telefon für Rückfragen (optional)</label>
        <input id="bf-phone" name="phone" type="tel" autoComplete="tel" />
      </div>
      <div className="field field--wide">
        <label htmlFor="bf-message">Nachricht und Wünsche</label>
        <textarea id="bf-message" name="message" rows={4} />
      </div>
      <div className="field field--wide booking-form-actions">
        <button type="submit" className="btn btn-invert">Anfrage als E-Mail öffnen</button>
        <p id="booking-form-note" className="booking-form-note" role={opened ? "status" : undefined}>
          {opened
            ? `Ihr E-Mail-Programm sollte sich jetzt öffnen. Falls nicht, schreiben Sie direkt an ${BOOKING_EMAIL}.`
            : "Öffnet Ihr E-Mail-Programm mit der fertig ausgefüllten Anfrage."}
        </p>
      </div>
    </form>
  );
}
