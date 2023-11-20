import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../../views/Home';
import Saved from '../../views/Saved';
import ArtworkDiscover from '../../views/ArtworkDiscover';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'Saved') {
            iconName = focused ? 'ios-heart' : 'ios-heart-outline';
          } else if (route.name === 'Discover') {
            iconName = focused ? 'ios-search' : 'ios-search-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#555',
        tabBarInactiveTintColor: '#ccc', 
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Discover" component={ArtworkDiscover} />
      <Tab.Screen name="Saved" component={Saved} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
