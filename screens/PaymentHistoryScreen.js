import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import DataController from '../controllers/DataController';

const PaymentHistoryScreen = () => {
  const history = DataController.getPaymentHistory();
  const [selectedYear, setSelectedYear] = useState('2024');

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <View>
        <Text style={styles.month}>{item.month}</Text>
        <Text style={styles.datePaid}>{item.datePaid || 'Pendiente'}</Text>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <View style={[styles.badge, item.status === 'Pendiente' ? styles.pendingBadge : styles.paidBadge]}>
             <Text style={[styles.badgeText, item.status === 'Pendiente' ? styles.pendingText : styles.paidText]}>
                {item.status === 'Pendiente' ? 'Pendiente' : '✓ Pagado'}
             </Text>
        </View>
        <Text style={styles.amount}>${item.amount.toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filtrar por año</Text>
        <View style={styles.yearSelector}>
            <Text style={styles.yearText}>{selectedYear}</Text>
        </View>
      </View>

      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Resumen {selectedYear}</Text>
        <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total pagado</Text>
            <Text style={styles.summaryValue}>$6,250.00</Text>
        </View>
        <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total pendiente</Text>
            <Text style={styles.summaryValue}>$2,500.00</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total del año</Text>
            <Text style={styles.totalValue}>$8,750.00</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  filterContainer: { padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  filterLabel: { fontSize: 16, color: '#666' },
  yearSelector: { backgroundColor: '#f0f0f0', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 8 },
  yearText: { fontWeight: 'bold' },
  list: { paddingHorizontal: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 1, borderColor: '#eee' },
  month: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  datePaid: { color: '#888', fontSize: 12 },
  amount: { fontSize: 16, fontWeight: 'bold', marginTop: 5 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, marginBottom: 5, alignSelf: 'flex-end' },
  paidBadge: { backgroundColor: '#d4edda' },
  pendingBadge: { backgroundColor: '#fff3cd' },
  paidText: { color: '#155724', fontSize: 10, fontWeight: 'bold' },
  pendingText: { color: '#856404', fontSize: 10, fontWeight: 'bold' },
  summaryContainer: { padding: 20, backgroundColor: '#f9f9f9', borderTopWidth: 1, borderColor: '#eee' },
  summaryTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  summaryLabel: { color: '#666' },
  summaryValue: { fontWeight: '500' },
  totalRow: { marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderColor: '#ddd' },
  totalLabel: { fontWeight: 'bold', fontSize: 16 },
  totalValue: { fontWeight: 'bold', fontSize: 16, color: '#2e64e5' }
});

export default PaymentHistoryScreen;