import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';

export default function Payments({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.paymentCard}>
        <Text style={styles.cardTitle}>Cuota del Mes</Text>
        <Text style={styles.amount}>$450.00 USD</Text>
        <Text style={styles.dueDate}>Fecha Límite: 15 Enero, 2025</Text>
        <Text style={styles.statusPending}>Pendiente</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.historyCard}>
        <Text style={styles.historyTitle}>Historial de Pagos</Text>
        <Text style={styles.historySubtitle}>Ver todos los pagos realizados</Text>
      </TouchableOpacity>

      <View style={styles.recentPayments}>
        <Text style={styles.sectionTitle}>Pagos Recientes</Text>
        <View style={styles.paymentItem}>
          <Text style={styles.paymentPeriod}>Diciembre 2024</Text>
          <Text style={styles.paymentStatus}>Pagado el 10 Dic, 2024 | $450.00</Text>
        </View>
        <View style={styles.paymentItem}>
          <Text style={styles.paymentPeriod}>Noviembre 2024</Text>
          <Text style={styles.paymentStatus}>Pagado el 08 Nov, 2024 | $450.00</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  paymentCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dueDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  statusPending: {
    color: '#FF3B30',
    fontWeight: '600',
  },
  historyCard: {
    backgroundColor: '#007AFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  historySubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  recentPayments: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  paymentItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  paymentPeriod: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  paymentStatus: {
    fontSize: 14,
    color: '#666',
  },
});