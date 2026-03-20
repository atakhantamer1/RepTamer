import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { calculateCo2, createRide, fetchRides } from '../api/rides';
import { estimateCo2Reduction } from '../utils/co2';

const initialForm = {
  startLatitude: '48.7833',
  startLongitude: '9.1829',
  destinationLatitude: '48.7758',
  destinationLongitude: '9.1829',
  availableSeats: '2',
  description: 'Mitfahrt zum Zentrum',
  departureTime: new Date(Date.now() + 3600000).toISOString()
};

export function RideBoardScreen() {
  const [rides, setRides] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [co2Preview, setCo2Preview] = useState(null);

  useEffect(() => {
    loadRides();
  }, []);

  async function loadRides() {
    const data = await fetchRides();
    setRides(data);
  }

  async function handleSubmit() {
    const payload = {
      ...form,
      startLatitude: Number(form.startLatitude),
      startLongitude: Number(form.startLongitude),
      destinationLatitude: Number(form.destinationLatitude),
      destinationLongitude: Number(form.destinationLongitude),
      availableSeats: Number(form.availableSeats)
    };

    await createRide(payload);
    await loadRides();
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mitfahrbörse</Text>
      {Object.entries(form).map(([key, value]) => (
        <TextInput
          key={key}
          style={styles.input}
          value={value}
          onChangeText={(text) => setForm((current) => ({ ...current, [key]: text }))}
          placeholder={key}
        />
      ))}
      <Button
        title="CO₂-Vorschau berechnen"
        onPress={async () => {
          const distanceKm = 12;
          const apiValue = await calculateCo2(distanceKm, Number(form.availableSeats));
          setCo2Preview({
            apiValue: apiValue.co2SavedKg,
            localValue: estimateCo2Reduction(distanceKm, Number(form.availableSeats))
          });
        }}
      />
      {co2Preview ? (
        <View style={styles.card}>
          <Text>Backend CO₂-Ersparnis: {co2Preview.apiValue} kg</Text>
          <Text>Client-Schätzung: {co2Preview.localValue} kg</Text>
        </View>
      ) : null}
      <Button title="Mitfahrt anbieten" onPress={handleSubmit} />
      <Text style={styles.subtitle}>Aktuelle Angebote</Text>
      {rides.map((ride) => (
        <View key={ride.id} style={styles.card}>
          <Text style={styles.cardTitle}>{ride.description}</Text>
          <Text>{ride.availableSeats} freie Sitze</Text>
          <Text>Abfahrt: {new Date(ride.departureTime).toLocaleString('de-DE')}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12
  },
  title: {
    fontSize: 24,
    fontWeight: '700'
  },
  subtitle: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '700'
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12
  },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    gap: 4
  },
  cardTitle: {
    fontWeight: '700'
  }
});
