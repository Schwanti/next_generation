# Next Steps – Next Generation Band Website

> Stand: 30.06.2026
>
> Priorisierte Entwicklungsschritte basierend auf vollständiger Code-Analyse
> und Absprache mit dem Auftraggeber.

---

## P0 – Sicherheit ✅

### 1. Middleware für Admin-Schutz ✅
- `proxy.ts` mit `export async function proxy` erstellt (Next.js 16 Konvention)
- Serverseitiger Schutz aller `/admin/*` Routen
- Bypass für `/admin/login`, `/admin/register` und `/admin/unauthorized`
- Build: `ƒ Proxy (Middleware)` aktiv, keine Warnings

### 2. Security-Fixes ✅
- Bucket hardcoden in `/api/upload`: nur `member-images` und `gig-images` erlaubt
- Datei-Typ-Validierung: nur JPEG, PNG, WebP, AVIF
- Datei-Größen-Limit: max. 10 MB
- Input-Validierung in allen POST/PUT-Routen (`validString()` Helper)
- Role-basierte Routen-Berechtigungen: `/admin/users` nur für `super_admin`

---

## P1 – Hoch

### 3. Multi-User Admin mit Registration & Approval ✅
- Auth-Konzept: Login mit Email + Passwort
- Registration-Seite (`/admin/register`): Band-Mitglieder registrieren sich selbst
  - Email + Passwort → Supabase Auth `signUp()`
  - Status nach Registration: `pending` via `app_metadata`
  - Rückmeldung: "Bitte bestätige zuerst deine E-Mail, sobald ein Admin dich freigeschaltet hat..."
- Super-Admin erhält Seite "Benutzer verwalten":
  - Liste aller registrierten User mit Status
  - Kann User auf `editor` setzen (Freischaltung) oder sperren (`pending`)
- Login prüft: Email + Passwort + Status muss `editor` oder `super_admin` sein
- Rolle in Supabase Auth `app_metadata` (keine separate `profiles`-Tabelle)
- Bootstrap: `ADMIN_EMAIL` + `ADMIN_PASSWORD` legt beim ersten Login Super-Admin an
- `/admin/unauthorized`-Seite bei fehlenden Rechten
- AuthIndicator zeigt angemeldeten Benutzer (Hauptseite + Admin)
- Abmelden-Button in allen Admin-Seiten

### 4. Error Boundaries
- `app/(main)/error.tsx` – öffentliche Seite
- `app/admin/error.tsx` – Admin-Panel

### 5. Impressum-Seite
- Inhalt von alter Seite übernehmen (Next Generation GbR, Thomas Schärtel, Am Kugelberg 9, 85072 Eichstätt)
- Neue Route: `app/(main)/impressum/page.tsx`
- Link im Footer

---

## P2 – Mittel

### 6. Logging für Admin-Änderungen
- Neue DB-Tabelle: `admin_logs` mit user_email, action, resource, details
- Log-Einträge in API-Routen nach erfolgreicher CRUD-Operation

### 7. Bild löschen im Admin-Panel
- "Bild entfernen"-Button im Bearbeitungs-Formular (Auftritte + Band-Mitglieder)
- Setzt `image_url` auf `null`, löscht Datei aus Storage

### 8. Hero Redesign
- Neues Background-Bild
- Weniger Text, reduziertere CTAs
- Status: Muss vom Auftraggeber konkretisiert werden

### 9. SSR für Auftritte & Band-Mitglieder
- Daten serverseitig laden statt client-seitigem `useEffect`
- Fetch in Page oder als Server Component
- Skeleton-Loader können entfallen

### 10. sitemap.xml & robots.txt
- `app/sitemap.ts`: Listet öffentliche Seiten (`/`, `/impressum`)
- `app/robots.ts`: Erlaubt Crawlen, blockt `/admin/*`

---

## P3 – Niedrig

### 11. Bildoptimierung
- `public/background_picture.png` prüfen (Größe, Format)
- Ggf. zu WebP konvertieren

### 12. Tailwind CSS Analyse
- Tailwind v4 installiert, aber komplett ungenutzt (alles in custom CSS)
- Option A: Entfernen → `npm uninstall tailwindcss @tailwindcss/postcss`
- Option B: Migration auf Utility-Klassen

### 13. Login Rate-Limiting
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
P0 (sofort)     ✅ Abgeschlossen
P1 (Hoch)       ├── 3. Multi-User Auth ✅
                ├── 4. Error Boundaries
                ├── 5. Impressum-Seite
P2 (Mittel)     ├── 6. Logging
                ├── 7. Bild löschen
                ├── 8. Hero Redesign
                ├── 9. SSR
                ├── 10. sitemap + robots.txt
P3 (Niedrig)    ├── 11. Bildoptimierung
                ├── 12. Tailwind entfernen
                ├── 13. Rate-Limiting
```
