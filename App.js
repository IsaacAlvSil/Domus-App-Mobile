import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

// 1. IMPORTAR TODAS TUS PANTALLAS
// Asegúrate de que los archivos estén en la carpeta './screens'
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import PagosScreen from './screens/PagosScreen';
import AvisosScreen from './screens/AvisosScreen';
import AmenidadesScreen from './screens/AmenidadesScreen';
import PerfilScreen from './screens/PerfilScreen';
import ServiciosScreen from './screens/ServiciosScreen';
import RegistroVisitante from './screens/RegistroVisitante';
import RegistroAusencia from './screens/RegistroAusencia';

// Creación de los navegadores
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// 2. CONFIGURACIÓN DE LAS PESTAÑAS (TABS) INFERIORES
// Esto controla el menú de abajo que se ve en la App principal
function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Ocultamos el header predeterminado para usar los nuestros personalizados
        tabBarActiveTintColor: '#2ecc71', // Color verde activo (branding)
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
          borderTopWidth: 0,
          elevation: 5,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          
          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Pagos') {
            iconName = focused ? 'card' : 'card-outline';
          } else if (route.name === 'Avisos') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'Amenidades') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={DashboardScreen} />
      <Tab.Screen name="Amenidades" component={AmenidadesScreen} />
      <Tab.Screen name="Pagos" component={PagosScreen} />
      <Tab.Screen name="Avisos" component={AvisosScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}

// 3. NAVEGACIÓN PRINCIPAL (STACK)
// Maneja el flujo global: Login -> Tabs -> Pantallas de Detalle
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        
        {/* Pantalla de Login (Sin Header) */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        
        {/* La App Principal (Contiene los Tabs) */}
        <Stack.Screen 
          name="HomeApp" 
          component={HomeTabs} 
          options={{ headerShown: false }} 
        />

        {/* --- PANTALLAS SECUNDARIAS (Se abren "encima" de los tabs) --- */}
        
        <Stack.Screen 
          name="RegistroVisitante" 
          component={RegistroVisitante} 
          options={{ 
            title: 'Registrar Visita',
            headerBackTitleVisible: false,
            headerTintColor: '#2c3e50'
          }}
        />
        
        <Stack.Screen 
          name="RegistroAusencia" 
          component={RegistroAusencia} 
          options={{ 
            title: 'Reportar Ausencia',
            headerBackTitleVisible: false,
            headerTintColor: '#2c3e50'
          }}
        />

        <Stack.Screen 
          name="Servicios" 
          component={ServiciosScreen} 
          options={{ 
            title: 'Directorio de Servicios',
            headerBackTitleVisible: false,
            headerTintColor: '#2c3e50'
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}