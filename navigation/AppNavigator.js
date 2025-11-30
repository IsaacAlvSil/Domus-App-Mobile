// navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // O 'react-native-vector-icons/Ionicons'

// Importación de Pantallas
import LoginScreen from '../screens/LoginScreen'; // Mantenemos el login previo
import DashboardScreen from '../screens/DashboardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PaymentScreen from '../screens/PaymentScreen';
import PaymentHistoryScreen from '../screens/PaymentHistoryScreen';
import NoticesScreen from '../screens/NoticesScreen';
import NoticeDetailScreen from '../screens/NoticeDetailScreen';
import VisitorScreen from '../screens/VisitorScreen';
import ServicesScreen from '../screens/ServicesScreen';
import AbsenceScreen from '../screens/AbsenceScreen';
import AmenitiesScreen from '../screens/AmenitiesScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Navegación Inferior (Tabs)
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Inicio') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Pagos') iconName = focused ? 'card' : 'card-outline';
          else if (route.name === 'Avisos') iconName = focused ? 'notifications' : 'notifications-outline';
          else if (route.name === 'Amenidades') iconName = focused ? 'grid' : 'grid-outline';
          else if (route.name === 'Perfil') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2e64e5',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Inicio" component={DashboardScreen} />
      <Tab.Screen name="Pagos" component={PaymentScreen} />
      <Tab.Screen name="Avisos" component={NoticesScreen} />
      <Tab.Screen name="Amenidades" component={AmenitiesScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Navegación Principal (Stack)
function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Auth */}
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        
        {/* Main App */}
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        
        {/* Pantallas Secundarias (Navegación desde el Dashboard o Tabs) */}
        <Stack.Screen name="PaymentHistory" component={PaymentHistoryScreen} options={{ title: 'Historial de Pagos' }} />
        <Stack.Screen name="NoticeDetail" component={NoticeDetailScreen} options={{ title: 'Detalle de Aviso' }} />
        <Stack.Screen name="VisitorRegistration" component={VisitorScreen} options={{ title: 'Registro de Visitante' }} />
        <Stack.Screen name="Services" component={ServicesScreen} options={{ title: 'Servicios' }} />
        <Stack.Screen name="Absences" component={AbsenceScreen} options={{ title: 'Reportar Ausencia' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;