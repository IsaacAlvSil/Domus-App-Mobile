import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import DataController from '../controllers/DataController';

const PaymentScreen = ({ navigation }) => {
  const payment = DataController.getPendingPayment();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Pagos</Text>
      
      <View style={styles.mainCard}>
        <Text style={styles.label}>Monto a Pagar</Text>
        <Text style={styles.amount}>${payment.amount} <Text style={{fontSize: 20, color: '#666'}}>USD</Text></Text>
        <View style={styles.statusContainer}>
             <Text style={styles.statusText}>{payment.status}</Text>
        </View>
        <Text style={styles.date}>Fecha Límite: {payment.dueDate}</Text>
      </View>

      <Text style={styles.sectionTitle}>Detalles del Pago</Text>
      <View style={styles.detailRow}>
        <Text>Concepto</Text><Text>Cuota Mensual</Text>
      </View>
      <View style={styles.detailRow}>
        <Text>Periodo</Text><Text>Enero 2025</Text>
      </View>
      <View style={[styles.detailRow, {borderBottomWidth: 0}]}>
        <Text style={{fontWeight:'bold'}}>Total</Text><Text style={{fontWeight:'bold'}}>${payment.amount}</Text>
      </View>

      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.payButtonText}>Pagar Ahora</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('PaymentHistory')} style={styles.historyLink}>
        <Text style={styles.historyText}>Ver Historial de Pagos</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 40, marginBottom: 20 },
  mainCard: { alignItems: 'center', padding: 30, backgroundColor: '#f8f9fa', borderRadius: 20, marginBottom: 30 },
  label: { fontSize: 16, color: '#666' },
  amount: { fontSize: 40, fontWeight: 'bold', color: '#333', marginVertical: 10 },
  statusContainer: { backgroundColor: '#ffeeba', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 15, marginBottom: 15 },
  statusText: { color: '#856404', fontWeight: 'bold' },
  date: { color: '#666' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 1, borderColor: '#eee' },
  payButton: { backgroundColor: '#28a745', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  payButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  historyLink: { marginTop: 20, alignItems: 'center' },
  historyText: { color: '#2e64e5', fontSize: 16 }
});

export default PaymentScreen;