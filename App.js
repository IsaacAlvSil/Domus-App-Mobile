// Archivo principal: configura la navegación y la app.
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Importación de Vistas (Screens)
import DashboardScreen from './screens/DashboardScreen';
import PagosScreen from './screens/PagosScreen';
import AvisosScreen from './screens/AvisosScreen';
import AmenidadesScreen from './screens/AmenidadesScreen';
import PerfilScreen from './screens/PerfilScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Inicio"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            // Definición de íconos según las interfaces PDF
            if (route.name === 'Inicio') {
              iconName = 'home-city';
            } else if (route.name === 'Pagos') {
              iconName = 'credit-card-outline';
            } else if (route.name === 'Avisos') {
              iconName = 'bell-outline';
            } else if (route.name === 'Amenidades') {
              iconName = 'table-tennis';
            } else if (route.name === 'Perfil') {
              iconName = 'account-circle-outline';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#6A5ACD', // Color morado/azul de las interfaces
          tabBarInactiveTintColor: 'gray',
          headerShown: false, // Ocultar el encabezado por defecto, cada pantalla lo puede manejar
          tabBarStyle: {
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
        })}
      >
        <Tab.Screen name="Inicio" component={DashboardScreen} />
        <Tab.Screen name="Pagos" component={PagosScreen} />
        <Tab.Screen name="Avisos" component={AvisosScreen} />
        <Tab.Screen name="Amenidades" component={AmenidadesScreen} />
        <Tab.Screen name="Perfil" component={PerfilScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;