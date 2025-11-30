import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const paymentsHistory = [
  { id: '1', month: 'Enero', date: '15 Ene 2024', status: 'Pagado', amount: '$1,250.00' },
  { id: '2', month: 'Febrero', date: '15 Feb 2024', status: 'Pagado', amount: '$1,250.00' },
  { id: '3', month: 'Marzo', date: '15 Mar 2024', status: 'Pagado', amount: '$1,250.00' },
  { id: '4', month: 'Abril', date: '15 Abr 2024', status: 'Pendiente', amount: '$1,250.00' },
];

const PagosScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.historyItem}>
      <View style={styles.historyIcon}>
        <Icon name={item.status === 'Pagado' ? "checkmark-circle" : "time"} size={24} color={item.status === 'Pagado' ? "#2ecc71" : "#f1c40f"} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.monthText}>{item.month}</Text>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={styles.amountText}>{item.amount}</Text>
        <Text style={[styles.statusText, { color: item.status === 'Pagado' ? "#2ecc71" : "#f1c40f" }]}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Tarjeta de Pago Actual */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Cuota de Enero 2025</Text>
        <Text style={styles.bigAmount}>$450.00 <Text style={{fontSize: 16, color: '#aaa'}}>USD</Text></Text>
        <Text style={styles.dueDate}>Fecha límite: 15 Enero, 2025</Text>
        <TouchableOpacity style={styles.payButton}>
          <Text style={styles.payButtonText}>Pagar Ahora</Text>
        </TouchableOpacity>
      </View>

      {/* Historial */}
      <View style={styles.historyContainer}>
        <Text style={styles.sectionTitle}>Historial 2024</Text>
        <FlatList
          data={paymentsHistory}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
  card: { backgroundColor: '#fff', borderRadius: 20, padding: 25, alignItems: 'center', elevation: 5, marginBottom: 30, marginTop: 20 },
  cardTitle: { fontSize: 16, color: '#7f8c8d', marginBottom: 10 },
  bigAmount: { fontSize: 40, fontWeight: 'bold', color: '#2c3e50', marginBottom: 5 },
  dueDate: { color: '#e74c3c', fontWeight: '600', marginBottom: 20 },
  payButton: { backgroundColor: '#2c3e50', paddingHorizontal: 40, paddingVertical: 15, borderRadius: 30, width: '100%', alignItems: 'center' },
  payButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  historyContainer: { flex: 1 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  historyItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 10 },
  historyIcon: { marginRight: 15 },
  monthText: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  dateText: { fontSize: 12, color: '#999' },
  amountText: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  statusText: { fontSize: 12, fontWeight: '600' }
});

export default PagosScreen;