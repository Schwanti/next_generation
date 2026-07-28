export const CONTACT_EMAIL = "info@nextgeneration-live.de";

export const BOOKING_EMAIL = "booking@nextgeneration-live.de";

export const PHONE_NUMBER = "+49 8421 234567";

const TEMPLATE = `--- Buchungsanfrage ---

Name / Verein:
E-Mail-Adresse:
Telefon (für Rückfragen):

Veranstaltungsart:
Wunschdatum (ca.):
Ort / Location:

Nachricht / Besondere Wünsche:

---`;

export const MAILTO_HREF = `mailto:${BOOKING_EMAIL}?subject=Buchungsanfrage%20-%20Next%20Generation&body=${encodeURIComponent(TEMPLATE)}`;
