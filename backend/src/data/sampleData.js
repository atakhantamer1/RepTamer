export const sampleParkings = [
  {
    id: 'mobidata-stuttgart-hbf',
    name: 'P+R Stuttgart Hbf',
    latitude: 48.7833,
    longitude: 9.1829,
    freeSpaces: 124,
    totalSpaces: 300,
    provider: 'MobiData BW',
    sourceUpdatedAt: new Date().toISOString()
  },
  {
    id: 'bahnpark-ulm',
    name: 'DB BahnPark Ulm',
    latitude: 48.399,
    longitude: 9.983,
    freeSpaces: 48,
    totalSpaces: 120,
    provider: 'DB BahnPark',
    sourceUpdatedAt: new Date().toISOString()
  }
];

export const sampleRides = [
  {
    startLatitude: 48.7833,
    startLongitude: 9.1829,
    destinationLatitude: 48.7758,
    destinationLongitude: 9.1829,
    availableSeats: 2,
    description: 'Pendelfahrt vom P+R zum Stadtzentrum, keine personenbezogenen Daten gespeichert.',
    departureTime: new Date(Date.now() + 60 * 60 * 1000).toISOString()
  },
  {
    startLatitude: 48.399,
    startLongitude: 9.983,
    destinationLatitude: 48.4011,
    destinationLongitude: 9.9876,
    availableSeats: 3,
    description: 'Mitfahrt zum Bahnhof, anonyme Kontaktaufnahme nur außerhalb dieses MVP.',
    departureTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString()
  }
];
