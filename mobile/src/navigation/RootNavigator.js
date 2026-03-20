import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MapScreen } from '../screens/MapScreen';
import { ParkingSearchScreen } from '../screens/ParkingSearchScreen';
import { RideBoardScreen } from '../screens/RideBoardScreen';

const Tab = createBottomTabNavigator();

export function RootNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Karte" component={MapScreen} />
      <Tab.Screen name="Parkplätze" component={ParkingSearchScreen} />
      <Tab.Screen name="Mitfahrbörse" component={RideBoardScreen} />
    </Tab.Navigator>
  );
}
