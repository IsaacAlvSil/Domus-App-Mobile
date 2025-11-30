import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Importar pantallas
import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import Payments from '../screens/Payments';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Inicio':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Pagos':
              iconName = focused ? 'card' : 'card-outline';
              break;
            case 'Avisos':
              iconName = focused ? 'notifications' : 'notifications-outline';
              break;
            case 'Amenidades':
              iconName = focused ? 'business' : 'business-outline';
              break;
            case 'Perfil':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'help-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Inicio" component={Dashboard} />
      <Tab.Screen name="Pagos" component={Payments} />
      <Tab.Screen name="Avisos" component={Dashboard} /> {/* Temporal */}
      <Tab.Screen name="Amenidades" component={Dashboard} /> {/* Temporal */}
      <Tab.Screen name="Perfil" component={Dashboard} /> {/* Temporal */}
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Main" 
          component={MainTabs} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}