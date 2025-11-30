import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DataController from '../controllers/DataController';

const DashboardScreen = ({ navigation }) => {
  const payment = DataController.getPendingPayment();
  const notices = DataController.getNotices();
  const latestNotice = notices[0];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hola, Gael</Text>
        <Text style={styles.subGreeting}>Bienvenido de vuelta</Text>
      </View>

      {/* Tarjeta de Pago Pendiente */}
      <View style={[styles.card, styles.paymentCard]}>
        <View>
          <Text style={styles.cardTitle}>Cuota mensual pendiente</Text>
          <Text style={styles.cardSubtitle}>Vence el {payment.dueDate}</Text>
          <Text style={styles.amount}>${payment.amount} <Text style={{fontSize: 14}}>USD</Text></Text>
        </View>
        <TouchableOpacity style={styles.payButton} onPress={() => navigation.navigate('Pagos')}>
          <Text style={styles.payButtonText}>Pagar</Text>
        </TouchableOpacity>
      </View>

      {/* Próxima Reserva */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Próxima reserva</Text>
        <View style={styles.card}>
          <Text style={styles.reservationTitle}>Salón de fiestas</Text>
          <Text>Sábado, 20 de enero • 14:00 - 18:00</Text>
          <Text style={styles.statusConfirmed}>Confirmada</Text>
        </View>
      </View>

      {/* Último Aviso */}
      <View style={styles.section}>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={styles.sectionTitle}>Último aviso publicado</Text>
            <Text style={styles.seeMore}>Hace 2 días</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.noticeTitle}>{latestNotice.title}</Text>
          <Text style={styles.noticeSummary}>{latestNotice.summary}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Avisos')}>
            <Text style={styles.linkText}>Ver completo</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Accesos Rápidos (Grid) */}
      <Text style={styles.sectionTitle}>Accesos rápidos</Text>
      <View style={styles.grid}>
        <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('Amenidades')}>
            <Ionicons name="calendar" size={24} color="#2e64e5" />
            <Text style={styles.gridText}>Reservar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('VisitorRegistration')}>
            <Ionicons name="people" size={24} color="#2e64e5" />
            <Text style={styles.gridText}>Agendar Visita</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('Services')}>
            <Ionicons name="construct" size={24} color="#2e64e5" />
            <Text style={styles.gridText}>Servicios</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('Absences')}>
            <Ionicons name="airplane" size={24} color="#2e64e5" />
            <Text style={styles.gridText}>Reportar Ausencia</Text>
        </TouchableOpacity>
      </View>
      <View style={{height: 20}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 20 },
  header: { marginTop: 40, marginBottom: 20 },
  greeting: { fontSize: 28, fontWeight: 'bold', color: '#333' },
  subGreeting: { fontSize: 16, color: '#666' },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 20, marginBottom: 15, elevation: 2 },
  paymentCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#eef2ff' },
  cardTitle: { fontSize: 14, color: '#666' },
  cardSubtitle: { fontSize: 12, color: '#888', marginBottom: 5 },
  amount: { fontSize: 24, fontWeight: 'bold', color: '#2e64e5' },
  payButton: { backgroundColor: '#2e64e5', paddingVertical: 8, paddingHorizontal: 20, borderRadius: 20 },
  payButtonText: { color: '#fff', fontWeight: 'bold' },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  reservationTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  statusConfirmed: { color: 'green', marginTop: 5, fontWeight: 'bold' },
  noticeTitle: { fontSize: 16, fontWeight: 'bold', color: '#d9534f' },
  noticeSummary: { color: '#555', marginTop: 5, marginBottom: 10 },
  linkText: { color: '#2e64e5', fontWeight: 'bold' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridItem: { width: '48%', backgroundColor: '#fff', padding: 20, borderRadius: 12, alignItems: 'center', marginBottom: 15, elevation: 1 },
  gridText: { marginTop: 10, color: '#333', fontWeight: '500' },
  seeMore: { color: '#888', fontSize: 12 }
});

export default DashboardScreen;