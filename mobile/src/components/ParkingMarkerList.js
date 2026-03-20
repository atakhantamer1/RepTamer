import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function ParkingMarkerList({ parkings = [] }) {
  return (
    <View style={styles.container}>
      {parkings.map((parking) => (
        <View key={parking.id} style={styles.card}>
          <Text style={styles.title}>{parking.name}</Text>
          <Text>{parking.freeSpaces} freie Plätze · {parking.provider}</Text>
          <Text>{parking.distanceKm?.toFixed?.(2) ?? parking.distanceKm} km entfernt</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    elevation: 2
  },
  title: {
    fontWeight: '700'
  }
});
