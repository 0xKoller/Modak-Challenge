import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParams } from '../types';
import ArtworkDetail from '../views/ArtworkDetail';
import ExhibitionDetail from '../views/ExhibitionDetail';
import BottomTabNavigator from '../components/BottomNavigator/BottomNavigator';
import ArtworkDiscover from '../views/ArtworkDiscover';

const Stack = createNativeStackNavigator<RootStackParams>();
const screenOptions = {
    headerStyle: {
        backgroundColor: '#fff',
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 4 }, 
        shadowOpacity: 0.3, 
        shadowRadius: 5, 
        elevation: 8,
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