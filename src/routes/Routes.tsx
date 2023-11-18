import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParams } from '../types';
import Home from '../views/Home';
import ArtworkDetail from '../views/ArtworkDetail';
import ExhibitionDetail from '../views/ExhibitionDetail';
import Saved from '../views/Saved';

const Stack = createNativeStackNavigator<RootStackParams>();
const screenOptions = {
    headerShown: false,

}

const Routes = () => (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen name="Home" component={Home} options={screenOptions}/>
                <Stack.Screen name="ArtworkDetail" component={ArtworkDetail} options={screenOptions}/>
                <Stack.Screen name="ExhibitionDetail" component={ExhibitionDetail} options={screenOptions}/>
                <Stack.Screen name="Saved" component={Saved} options={screenOptions}/>
            </Stack.Navigator>
        </NavigationContainer>
)

export default Routes;