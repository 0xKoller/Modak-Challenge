import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParams } from '../types';
import Home from '../views/Home';
import ArtworkDetail from '../views/ArtworkDetail';
import ExhibitionDetail from '../views/ExhibitionDetail';
import Saved from '../views/Saved';
import BottomTabNavigator from '../components/BottomNavigator/BottomNavigator';
import ArtworkDiscover from '../views/ArtworkDiscover';

const Stack = createNativeStackNavigator<RootStackParams>();
const screenOptions = {
    headerStyle: {
        backgroundColor: '#fff',
        shadowColor: "#000", // El color de la sombra
        shadowOffset: { width: 0, height: 4 }, // La dirección de la sombra
        shadowOpacity: 0.3, // La opacidad de la sombra
        shadowRadius: 5, // El desenfoque de la sombra
        // Propiedad de sombra para Android
        elevation: 8, // La altura de la sombra, que da el efecto 3D
        paddingTop: 40,
    }
}

function MainStackNavigator() {
  return (
    <Stack.Navigator initialRouteName='HomeTabs' screenOptions={screenOptions}>
      <Stack.Screen name="HomeTabs" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="ArtworkDetail" component={ArtworkDetail} options={screenOptions}/>
      <Stack.Screen name="ExhibitionDetail" component={ExhibitionDetail} options={screenOptions}/>
      <Stack.Screen name="Discover" component={ArtworkDiscover} options={screenOptions}/>
    </Stack.Navigator>
    
  );
}

const Routes = () => (
        <NavigationContainer>
            <MainStackNavigator />
        </NavigationContainer>
)

export default Routes;