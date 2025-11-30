import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Usamos Native Stack
import { Ionicons } from '@expo/vector-icons'; 

// --- IMPORTACIONES DE PANTALLAS (Rutas corregidas a ./screens) ---
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import ProfileScreen from './screens/ProfileScreen';
import AbsenceScreen from './screens/AbsenceScreen';
import AmenitiesScreen from './screens/AmenitiesScreen';
import NoticeDetailScreen from './screens/NoticeDetailScreen';
import PaymentHistoryScreen from './screens/PaymentHistoryScreen';
import PaymentScreen from './screens/PaymentScreen';
import NoticesScreen from './screens/NoticesScreen';
import ServicesScreen from './screens/ServicesScreen';
import VisitorScreen from './screens/VisitorScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import RegisterScreen from './screens/RegisterScreen';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// --- CONFIGURACIÓN DE TABS (Menú Inferior) ---
function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#2e64e5',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { paddingBottom: 5, height: 60 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Inicio') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Pagos') iconName = focused ? 'card' : 'card-outline';
          else if (route.name === 'Avisos') iconName = focused ? 'notifications' : 'notifications-outline';
          else if (route.name === 'Amenidades') iconName = focused ? 'grid' : 'grid-outline';
          else if (route.name === 'Perfil') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
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

// --- NAVEGACIÓN PRINCIPAL (App) ---
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        
        {/* Pantalla de Login */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        
        {/* Aplicación Principal (Tabs) */}
        <Stack.Screen 
          name="Main" 
          component={HomeTabs} 
          options={{ headerShown: false }} 
        />

        {/* Pantallas Secundarias */}
        <Stack.Screen 
          name="PaymentHistory" 
          component={PaymentHistoryScreen} 
          options={{ title: 'Historial de Pagos' }} 
        />
        <Stack.Screen 
          name="NoticeDetail" 
          component={NoticeDetailScreen} 
          options={{ title: 'Detalle de Aviso' }} 
        />
        <Stack.Screen 
          name="VisitorRegistration" 
          component={VisitorScreen} 
          options={{ title: 'Registro de Visitante' }} 
        />
        <Stack.Screen 
          name="Services" 
          component={ServicesScreen} 
          options={{ title: 'Servicios' }} 
        />
        <Stack.Screen 
          name="Absences" 
          component={AbsenceScreen} 
          options={{ title: 'Reportar Ausencia' }} 
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="ForgotPassword" 
          component={ForgotPasswordScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}