# Park&Ride Mobilitäts-App MVP

Dieses Repository enthält ein vollständiges MVP für eine Park&Ride-Mobilitäts-App mit Node.js/Express-Backend und einer React-Native-/Expo-Mobile-App.

## Architektur

- `backend/`: REST-API mit Express, Sequelize und PostgreSQL/PostGIS-Datenmodellen.
- `mobile/`: React-Native-App mit Expo, React Navigation und Kartenansicht.

## Funktionen

- Echtzeitnahe Parkplatzsuche über externe Park-APIs (MobiData BW, DB BahnPark) mit Fallback auf Seed-Daten.
- Mitfahrbörse mit REST-Endpunkten für Listen und Erstellen von Angeboten.
- CO₂-Berechnung über Backend und Client.
- Beispielintegration für Google Maps Directions und ÖPNV-Dienste (HAFAS/VVO).
- DSGVO-Hinweise direkt im Code: keine personenbezogenen Daten, keine dauerhafte Speicherung von Ortungsdaten.

## Installation

### Voraussetzungen

- Node.js 20+
- PostgreSQL 15+ mit aktivierter PostGIS-Erweiterung
- Expo CLI / React-Native-Tooling für mobile Builds

### Backend starten

```bash
cd backend
cp .env.example .env
npm install
npm run start
```

### Mobile App starten

```bash
cd mobile
cp .env.example .env
npm install
npm run start
```

## Wichtige Umgebungsvariablen

Backend (`backend/.env`):

- `DATABASE_URL`
- `GOOGLE_MAPS_API_KEY`
- `MOBIDATA_PARK_API_URL`
- `DB_BAHNPARK_API_URL`
- `HAFAS_API_URL`
- `VVO_API_URL`

Mobile (`mobile/.env`):

- `EXPO_PUBLIC_API_BASE_URL`
- `EXPO_PUBLIC_GOOGLE_MAPS_API_KEY`

## REST-API

- `GET /api/parkings?lat={lat}&lng={lng}`: Nahe Parkplätze laden und extern aktualisieren.
- `GET /api/rides`: Mitfahrangebote abrufen.
- `POST /api/rides`: Mitfahrangebot anlegen.
- `GET /api/calculateCO2?distance={km}&passengers={n}`: CO₂-Einsparung berechnen.
- `GET /api/transit/nearby?lat={lat}&lng={lng}`: Beispielanbindung für HAFAS/VVO.
- `GET /api/transit/directions?...`: Google-Maps-Richtungen.

## Datenschutz / DSGVO

- Das MVP speichert keine Nutzerkonten und keine personenbezogenen Daten.
- Standortdaten werden im Mobile-Client nur flüchtig zur aktuellen Kartenanzeige verwendet.
- CO₂-Berechnungen sind anonym und enthalten keine Benutzeridentität.

## Testdaten

Beispiel-Parkplätze und Mitfahrten liegen in `backend/src/data/sampleData.js`.
