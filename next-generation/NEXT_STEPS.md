# Next Steps – Next Generation Band Website

> Stand: 29.06.2026
>
> Priorisierte Entwicklungsschritte basierend auf vollständiger Code-Analyse
> und Absprache mit dem Auftraggeber.

---

## P0 – Sicherheit (sofort)

### 1. Middleware für Admin-Schutz
- `proxy.ts` → `middleware.ts` umbenennen und in `next-generation/` ablegen
- Serverseitiger Schutz aller `/admin/*` Routen
- Bypass nur für `/admin/login` und `/admin/register`
- Anschließend `proxy.ts` löschen

### 2. Security-Fixes
- **Bucket hardcoden** in `/api/upload`: nur `member-images` und `gig-images` erlauben (aktuell via `formData.get("bucket")` steuerbar → authenticated user könnte in beliebige Buckets hochladen)
- Input-Validierung in API-Routen (Pflichtfelder, Datumsformat, String-Längen)

---

## P1 – Hoch

### 3. Multi-User Admin mit Registration & Approval
- Neues Auth-Konzept: Login mit **Email + Passwort** (statt nur Passwort)
- **Registration-Seite** (`/admin/register`): Band-Mitglieder registrieren sich selbst
  - Email + Passwort → Supabase Auth `signUp()`
  - Status nach Registration: `pending`
  - Rückmeldung: "Warte auf Freischaltung"
  - Passwort nie im Klartext (Supabase handled Hashing)
- **Super-Admin** erhält Seite "Benutzer verwalten":
  - Liste aller registrierten User mit Status
  - Kann User auf `editor` setzen (Freischaltung)
- **Login** prüft: Email + Passwort + Status muss `editor` oder `super_admin` sein
- Neue DB-Tabelle: `profiles` (linked to `auth.users` via `id`)
  - `id` (uuid, PK, FK → auth.users.id)
  - `email` (text)
  - `role` (text: 'pending' | 'editor' | 'super_admin')
  - `created_at` (timestamptz)
  - Trigger: Bei `auth.users` INSERT automatisch `profiles`-Row mit `role='pending'` anlegen
- `/api/auth/login` umbauen:
  - `ADMIN_PASSWORD`-Prüfung entfernen
  - Auto-Create-User-Logik entfernen
  - Direkt `signInWithPassword` + Role-Check
- `ADMIN_EMAIL`-Konstante entfällt → aus Login-Formular

### 4. Error Boundaries
- `app/(main)/error.tsx` – öffentliche Seite
- `app/admin/error.tsx` – Admin-Panel
- Graceful Degradation statt weißem Bildschirm

### 5. Impressum-Seite
**Rechtliche Einordnung:**
- Die Website ist geschäftsmäßig (Coverband mit Buchungsanfragen) → Impressumspflicht nach §5 DDG
- Ohne Impressum drohen Abmahnungen (500–2.000 €)
- Relevantes Gesetz: §5 Digitale-Dienste-Gesetz (DDG), seit Mai 2024, löst §5 TMG ab
- Inhalte identisch zur alten Version

**Inhalt (von alter Seite übernommen):**
```
Next Generation GbR
Thomas Schärtel
Am Kugelberg 9
85072 Eichstätt

Kontakt: booking@nextgeneration-live.de
```

**Umsetzung:**
- Neue Route: `app/(main)/impressum/page.tsx` (einfache Page, verlinkt im Footer)
- Eventuell auch Datenschutzerklärung (alte Seite hatte eine unter `/j/privacy`) – zur Prüfung notieren

---

## P2 – Mittel

### 6. Logging für Admin-Änderungen
- Neue DB-Tabelle: `admin_logs`
  - `id` (bigint, PK)
  - `user_email` (text)
  - `action` (text: 'create' | 'update' | 'delete')
  - `resource` (text: 'performance' | 'band_member')
  - `resource_id` (int)
  - `details` (jsonb – geänderte Felder)
  - `created_at` (timestamptz)
- In API-Routen (`POST/PUT/DELETE` für Auftritte und Band-Mitglieder): Log-Eintrag nach erfolgreicher Operation einfügen
- Supabase `createAdminClient()` für Log-Schreibzugriff

### 7. Hero Redesign
- **Neues Background-Bild** ersetzen (aktuell `public/background_picture.png`)
- Weniger Text:
  - Nur Band-Logo + ggf. Headline
  - Subtitle kürzen oder entfernen
  - CTAs reduzieren
- **Status:** Muss vom Auftraggeber konkretisiert werden (Bild, Layout)

### 8. SSR für Auftritte & Band-Mitglieder
- Aktuell: Client-seitiges `useEffect` → leeres HTML beim ersten Render
- Ziel: Daten serverseitig laden
- `components/auftritte.tsx` & `components/band.tsx`:
  - Fetch in Page oder als Server Component
  - Skeleton-Loader können entfallen
- Daten aus API-Routen → direkter Supabase-Zugriff im Page-Component

### 9. sitemap.xml & robots.txt
- `app/sitemap.ts`: Listet öffentliche Seiten (`/`, `/impressum`)
- `app/robots.ts`: Erlaubt Crawlen, blockt `/admin/*`
- Geringer Aufwand (< 30 Zeilen), keine Dependencies

---

## P3 – Niedrig

### 10. Bildoptimierung
- `public/background_picture.png` prüfen (Größe, Format)
- Ggf. zu WebP konvertieren

### 11. Tailwind CSS Analyse
- Tailwind v4 installiert, aber **komplett ungenutzt** (alles in 1593 Zeilen custom CSS)
- Option A: Entfernen → `npm uninstall tailwindcss @tailwindcss/postcss`
- Option B: Migration auf Utility-Klassen → kein dringender Bedarf
- **Empfehlung:** Option A

### 12. Login Rate-Limiting
- `/api/auth/login` vor Brute-Force schützen
- Einfache In-Memory-Lösung oder bei Deployment (Cloudflare/Vercel)

---

## Nicht umgesetzt (bewusst entschieden)

| Feature | Grund |
|---------|-------|
| Kontaktformular mit Backend | Bleibt bei `mailto:` – kein Resend, keine DSGVO-Komplexität |
| Admin-UI verschönern | Nicht nötig – funktional ausreichend |
| Inhalte über Admin editierbar | Band-Inhaber pflegt direkt mit Entwickler |
| Instagram Elfsight ersetzen | Funktioniert, kein akuter Handlungsbedarf |

---

## Umsetzungsreihenfolge

```
P0 (sofort)
├── 1. Middleware + Security-Fixes
│
P1 (nächster Durchgang)
├── 3. Multi-User Auth + Registration
├── 4. Error Boundaries
├── 5. Impressum-Seite
│
P2 (danach)
├── 6. Logging
├── 7. Hero Redesign
├── 8. SSR
├── 9. sitemap + robots.txt
│
P3 (optional)
├── 10. Bildoptimierung
├── 11. Tailwind entfernen
├── 12. Rate-Limiting
```
