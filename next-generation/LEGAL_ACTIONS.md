# Sofortige Maßnahmen – Rechtliche Compliance

> Erstellt: 22.07.2026
>
> Basierend auf DSGVO/TTDSG-Audit vom 22.07.2026.
>priorisierte Sofortmaßnahmen zur Behebung kritischer Compliance-Lücken.

---

## 1. Cookie-Consent-Banner implementieren

**Priorität:** Sofort
**Aufwand:** 2-4 Stunden
**Betroffene Dateien:**
- Neue Datei: `components/cookie-consent.tsx`
- `app/layout.tsx` – Banner einbinden
- `components/instagram.tsx` – Elfsight-Script nur nach Consent laden
- `components/band.tsx` – DiceBear nur nach Consent laden
- `app/styles.css` – Banner-Stile

**Problem:** Das Elfsight-Instagram-Widget und DiceBear laden ohne vorherige Einwilligung des Nutzers. Beide setzen Cookies und übermitteln personenbezogene Daten (IP, Browser-Fingerprint) an US-Dienste. Dies verstößt gegen TTDSG §25 Abs. 1.

**Lösung:** DSGVO-konformer Consent-Banner, der nicht-essentielle Scripts blockiert, bis der Nutzer explizit einwilligt.

---

## 2. DiceBear-API-Anruf durch lokale SVG-Lösung ersetzen

**Priorität:** Sofort
**Aufwand:** ca. 30 Minuten
**Betroffene Dateien:**
- `components/band.tsx` – Zeile 57

**Problem:** Bei Band-Mitgliedern ohne Bild wird `https://api.dicebear.com/7.x/initials/svg?seed=...` aufgerufen. Dabei werden der Name des Bandmitglieds und die IP-Adresse an einen US-Dienst übermittelt – ohne Einwilligung.

**Lösung:** Lokalen React-Component erstellen, der Initialen als SVG generiert (kein externer Aufruf nötig).

---

## 3. Hardcoded Admin-Passwort aus `.env.local` entfernen

**Priorität:** Sofort
**Aufwand:** ca. 30 Minuten
**Betroffene Dateien:**
- `.env.local` – Zeile 4

**Problem:** `ADMIN_PASSWORD=Winner2@lKNJO2@4` steht im Klartext in der `.env.local`. Bei versehentlichem Commit (z.B. durch `.gitignore`-Fehler) wäre das Passwort öffentlich. Verstoß gegen Art. 32 DSGVO (angemessene Sicherheitsmaßnahmen).

**Lösung:**
1. Passwort aus `.env.local` entfernen
2. Sicherstellen, dass `.env.local` niemals committed wurde (`git log --all --full-history -- .env.local` prüfen)
3. Supabase Auth ausschließlich nutzen oder Secret-Management-Tool einsetzen

---

## 4. Datenschutzerklärung vollständig überarbeiten

**Priorität:** Sofort
**Aufwand:** 3-5 Stunden
**Betroffene Dateien:**
- `app/(main)/datenschutz/page.tsx`

**Problem:** Die Datenschutzerklärung enthält 11 Pflichtangaben nach Art. 13 DSGVO nicht:
1. Aufsichtsbehörde nicht benannt (BfDI / Bayerisches LDA)
2. Datenverarbeitungsverträge (AV-Verträge) nicht erwähnt
3. Automatisierte Entscheidungen nicht thematisiert
4. Cookie-Erklärung fehlt komplett (TTDSG §25)
5. Elfsight/DiceBear nicht dokumentiert
6. Supabase nicht erwähnt
7. Upstash nicht erwähnt
8. Drittlandtransfers unvollständig (nur Vercel, nicht Supabase/Elfsight/DiceBear/Upstash)
9. Rechtsgrundlage für Cookie-Speicherung fehlt
10. Registrierungsdatenverarbeitung nicht dokumentiert
11. Rechte der betroffenen Person unvollständig

**Lösung:** Vollständige Neuerstellung gemäß Art. 13 DSGVO unter Einbeziehung aller Datenverarbeitungstätigkeiten.

---

## Priorität nach Umsetzung

```
1. Cookie-Consent-Banner    [ ] Offen
2. DiceBear lokal           [ ] Offen
3. Admin-Passwort fixen     [ ] Offen
4. Datenschutzerklärung      [ ] Offen
```

---

*Dieses Dokument wird nach Umsetzung der einzelnen Punkte aktualisiert.*
