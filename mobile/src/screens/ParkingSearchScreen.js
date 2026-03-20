import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { fetchParkings } from '../api/parkings';
import { ParkingMarkerList } from '../components/ParkingMarkerList';

export function ParkingSearchScreen() {
  const [lat, setLat] = useState('48.7833');
  const [lng, setLng] = useState('9.1829');
  const [parkings, setParkings] = useState([]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Parkplatzsuche</Text>
      <TextInput style={styles.input} value={lat} onChangeText={setLat} placeholder="Breitengrad" keyboardType="numeric" />
      <TextInput style={styles.input} value={lng} onChangeText={setLng} placeholder="Längengrad" keyboardType="numeric" />
      <Button
        title="Nahe Parkplätze laden"
        onPress={async () => {
          const data = await fetchParkings(Number(lat), Number(lng));
          setParkings(data);
        }}
      />
      <View style={styles.section}>
        <Text style={styles.subtitle}>Ergebnisse</Text>
        <ParkingMarkerList parkings={parkings} />
      </View>
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
    fontSize: 18,
    fontWeight: '600'
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#d0d0d0',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12
  },
  section: {
    marginTop: 8
  }
});
