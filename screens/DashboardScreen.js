// src/views/DashboardScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { CommonStyles, Colors } from '../styles/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Simulación de datos dinámicos (en una app real vendrían de un hook/controlador)
const data = {
  nextPayment: { amount: '$2,450 MXN', dueDate: '15 de enero' },
  nextReservation: { amenity: 'Salón de fiestas', date: 'Sábado, 20 de enero', time: '14:00 - 18:00' },
  latestNotice: { title: 'Mantenimiento de elevadores', timeAgo: 'Hace 2 días', detail: 'Se realizará mantenimiento preventivo en los elevadores A y B el próximo lunes de 9:00 a 13:00 hrs.' },
};

const QuickAccessButton = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.quickAccessButton} onPress={onPress}>
    <View style={styles.iconCircle}>
      <Icon name={icon} size={24} color={Colors.primary} />
    </View>
    <Text style={styles.quickAccessLabel}>{label}</Text>
  </TouchableOpacity>
);

const DashboardScreen = ({ navigation }) => {
  return (
    <ScrollView style={CommonStyles.container}>
      <Text style={styles.greeting}>Hola, Gael</Text>
      <Text style={styles.welcome}>Bienvenido de vuelta</Text>

      {/* Tarjeta de Cuota Pendiente */}
      <View style={[CommonStyles.card, styles.paymentCard]}>
        <Text style={styles.paymentTitle}>Cuota mensual pendiente</Text>
        <Text style={styles.paymentDueDate}>Vence el {data.nextPayment.dueDate}</Text>
        <Text style={styles.paymentAmount}>{data.nextPayment.amount}</Text>
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
        <Text style={CommonStyles.subtitle}>
          <Icon name="check-circle" size={14} color={Colors.success} /> Confirmada
        </Text>
        <Text style={styles.detailText}>{data.nextReservation.amenity}</Text>
        <Text style={styles.detailText}>{data.nextReservation.date}</Text>
        <Text style={styles.detailText}><Icon name="clock-outline" size={14} color="gray" /> {data.nextReservation.time}</Text>
      </View>

      {/* Tarjeta de Último Aviso */}
      <View style={CommonStyles.card}>
        <Text style={CommonStyles.title}>Último aviso publicado</Text>
        <Text style={CommonStyles.subtitle}>{data.latestNotice.timeAgo}</Text>
        <Text style={styles.noticeTitle}>{data.latestNotice.title}</Text>
        <Text style={styles.detailText} numberOfLines={2}>{data.latestNotice.detail}</Text>
        <TouchableOpacity 
          style={styles.link} 
          onPress={() => navigation.navigate('Avisos')}
        >
          <Text style={styles.linkText}>Ver completo <Icon name="chevron-right" size={16} /></Text>
        </TouchableOpacity>
      </View>
      
      {/* Accesos Rápidos */}
      <Text style={[CommonStyles.title, { marginTop: 30 }]}>Accesos rápidos</Text>
      <View style={styles.quickAccessContainer}>
        <QuickAccessButton icon="tennis-ball" label="Reservar amenidad" onPress={() => navigation.navigate('Amenidades')} />
        <QuickAccessButton icon="car-side" label="Agendar Visita" onPress={() => Alert.alert('Funcionalidad', 'Aquí se agendaría una visita (no implementado).')} />
        <QuickAccessButton icon="wrench-outline" label="Agendar Servicio" onPress={() => Alert.alert('Funcionalidad', 'Aquí se agendaría un servicio (no implementado).')} />
        <QuickAccessButton icon="run" label="Reportar Ausencia" onPress={() => Alert.alert('Funcionalidad', 'Aquí se reportaría una ausencia (no implementado).')} />
      </View>
      
    </ScrollView>
  );
};

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
    marginBottom: 40,
  },
  quickAccessButton: {
    width: '48%', // Dos columnas
    backgroundColor: Colors.card,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  iconCircle: {
    backgroundColor: '#6A5ACD15',
    borderRadius: 50,
    padding: 10,
    marginBottom: 8,
  },
  quickAccessLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
  },
});

export default DashboardScreen;