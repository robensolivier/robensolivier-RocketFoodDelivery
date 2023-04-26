import React from 'react';
import Restaurants from '../views/restaurants';
import Menu from '../views/menu';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Button from 'react-bootstrap/Button';

export default function RestaurantScreen() {
    const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, headerMode: 'none'}}>
      <Stack.Screen name="Restaurants" component={Restaurants}/>
      <Stack.Screen name="Menu" component={Menu}/>
    </Stack.Navigator>
  )
}
