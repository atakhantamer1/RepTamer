import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { fetchParkings, fetchDirections } from '../api/parkings';
import { ParkingMarkerList } from '../components/ParkingMarkerList';

const defaultRegion = {
  latitude: 48.7833,
  longitude: 9.1829,
  latitudeDelta: 0.08,
  longitudeDelta: 0.08
};

export function MapScreen() {
  const [region, setRegion] = useState(defaultRegion);
  const [parkings, setParkings] = useState([]);
  const [routeSummary, setRouteSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMapData();
  }, []);

  async function loadMapData() {
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (permission.status === 'granted') {
        const currentLocation = await Location.getCurrentPositionAsync({});
        // DSGVO: Standortdaten werden nur flüchtig im Client verwendet und nicht langfristig gespeichert.
        const nextRegion = {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08
        };
        setRegion(nextRegion);
        const nearbyParkings = await fetchParkings(nextRegion.latitude, nextRegion.longitude);
        setParkings(nearbyParkings);

        if (nearbyParkings.length > 0) {
          const directions = await fetchDirections(
            { latitude: nextRegion.latitude, longitude: nextRegion.longitude },
            { latitude: nearbyParkings[0].latitude, longitude: nearbyParkings[0].longitude }
          );
          const leg = directions.routes?.[0]?.legs?.[0];
          if (leg) {
            setRouteSummary({ distance: leg.distance?.text, duration: leg.duration?.text });
          }
        }
      }
    } finally {
      setLoading(false);
    }
  }

  const markers = useMemo(() => parkings.slice(0, 10), [parkings]);

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" />;
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={region}>
        {markers.map((parking) => (
          <Marker
            key={parking.id}
            coordinate={{ latitude: parking.latitude, longitude: parking.longitude }}
            title={parking.name}
            description={`${parking.freeSpaces} freie Plätze`}
          />
        ))}
      </MapView>
      <View style={styles.overlay}>
        <Text style={styles.header}>Nächste P+R-Parkplätze</Text>
        {routeSummary ? <Text>Route: {routeSummary.distance} · {routeSummary.duration}</Text> : null}
        <ParkingMarkerList parkings={markers} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  overlay: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    padding: 12,
    gap: 8,
    maxHeight: '45%'
  },
  header: {
    fontSize: 18,
    fontWeight: '700'
  },
  loader: {
    flex: 1,
    justifyContent: 'center'
  }
});
