import React from 'react';
import HomeScreen from './src/components/HomeScreen.js'
import InfoScreen from './src/components/InfoScreen.js';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: "#2B9EB3",
        },
        headerTintColor: "white",
      }}>
        <Stack.Screen name="Lista" component={HomeScreen} options={{
          title: "Lista de Doenças",
          headerTitleAlign: "center",
        }} />
        <Stack.Screen name="Info" component={InfoScreen} options={{
          title: "Informações",
          headerTitleAlign: "center"
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}