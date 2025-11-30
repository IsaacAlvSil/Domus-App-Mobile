// src/views/DashboardScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { CommonStyles, Colors } from '../styles/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DashboardScreen = ({ navigation }) => {
  return (
    <ScrollView style={CommonStyles.container}>
      <Text style={styles.greeting}>Hola, Gael</Text>
      <Text style={styles.welcome}>Bienvenido de vuelta</Text>

      {/* Tarjeta de Cuota Pendiente */}
      <View style={[CommonStyles.card, styles.paymentCard]}>
        <Text style={styles.paymentTitle}>Cuota mensual pendiente</Text>
        <Text style={styles.paymentDueDate}>Vence el 15 de enero</Text>
        <Text style={styles.paymentAmount}>$2,450 MXN</Text>
        <TouchableOpacity
          style={CommonStyles.buttonPrimary}
          onPress={() => navigation.navigate('Pagos')}
        >
          <Text style={CommonStyles.buttonText}>Pagar</Text>
        </TouchableOpacity>
      </View>

      {/* Tarjeta de Próxima Reserva */}
      <View style={CommonStyles.card}>
        <Text style={CommonStyles.title}>Próxima reserva</Text>
        <Text style={CommonStyles.subtitle}>Salón de fiestas - Confirmada</Text>
        <Text style={styles.detailText}>Sábado, 20 de enero</Text>
        <Text style={styles.detailText}>14:00 - 18:00</Text>
      </View>

      {/* Tarjeta de Último Aviso */}
      <View style={CommonStyles.card}>
        <Text style={CommonStyles.title}>Último aviso publicado</Text>
        <Text style={CommonStyles.subtitle}>Hace 2 días</Text>
        <Text style={styles.noticeTitle}>Mantenimiento de elevadores</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Avisos')} style={styles.link}>
          <Text style={styles.linkText}>Ver completo</Text>
        </TouchableOpacity>
      </View>

      {/* Accesos Rápidos */}
      <Text style={[CommonStyles.title, { marginTop: 15, marginBottom: 10 }]}>Accesos rápidos</Text>
      <View style={styles.quickAccessContainer}>
        <QuickAccessButton icon="table-tennis" label="Reservar amenidad" onPress={() => navigation.navigate('Amenidades')} />
        <QuickAccessButton icon="car-side" label="Agendar Visita" onPress={() => {}} />
        <QuickAccessButton icon="wrench" label="Agendar Servicio" onPress={() => {}} />
        <QuickAccessButton icon="account-off" label="Reportar Ausencia" onPress={() => {}} />
      </View>
    </ScrollView>
  );
};

const QuickAccessButton = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.quickAccessButton} onPress={onPress}>
    <Icon name={icon} size={30} color={Colors.primary} />
    <Text style={styles.quickAccessText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 40,
  },
  welcome: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  paymentCard: {
    backgroundColor: Colors.primary,
    padding: 20,
  },
  paymentTitle: {
    color: Colors.card,
    fontSize: 16,
  },
  paymentDueDate: {
    color: Colors.card,
    fontSize: 14,
    opacity: 0.8,
  },
  paymentAmount: {
    color: Colors.card,
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  detailText: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
  },
  link: {
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  linkText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  quickAccessContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAccessButton: {
    backgroundColor: Colors.card,
    width: '48%', // Dos columnas
    height: 120,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 2,
  },
  quickAccessText: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text,
  },
});

export default DashboardScreen;