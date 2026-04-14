# Atakhan Tamer IT Website

Moderne, statische Website mit SEO-optimierten Leistungsseiten für Microsoft 365 und SharePoint Beratung.

## Lokal testen

### Option A: Ohne PHP (nur HTML/CSS ansehen)
```bash
python3 -m http.server 8080
```
Dann öffnen: `http://localhost:8080`

### Option B: Mit Kontaktformular (PHP-Mailversand testen)
```bash
php -S localhost:8080
```
Dann öffnen: `http://localhost:8080`

> Hinweis: Der lokale Mailversand via `mail()` hängt von Ihrer lokalen PHP-/SMTP-Konfiguration ab.

## Deployment auf Webserver

1. Alle Dateien aus diesem Ordner auf Ihren Webspace hochladen.
2. Sicherstellen, dass PHP für `contact.php` aktiviert ist.
3. Domain-URLs (`canonical`) ggf. anpassen.
4. `impressum.html` und `datenschutz.html` mit finalen Pflichttexten ergänzen.

## Seitenstruktur

- `index.html`
- `leistungen/*.html`
- `contact.php`
- `kontakt-erfolg.html`
- `impressum.html`
- `datenschutz.html`
- `assets/styles.css`
