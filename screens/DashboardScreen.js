import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const DashboardScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hola, Gael 👋</Text>
          <Text style={styles.subGreeting}>Bienvenido de vuelta</Text>
        </View>
        <TouchableOpacity>
           <Icon name="notifications-outline" size={28} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Alerta de Pago */}
      <View style={styles.alertCard}>
        <View>
          <Text style={styles.alertLabel}>Cuota mensual pendiente</Text>
          <Text style={styles.alertAmount}>$2,450 MXN</Text>
          <Text style={styles.alertDate}>Vence el 15 de enero</Text>
        </View>
        <TouchableOpacity style={styles.payBtn} onPress={() => navigation.navigate('Pagos')}>
          <Text style={styles.payBtnText}>Pagar</Text>
        </TouchableOpacity>
      </View>

      {/* Accesos Rápidos */}
      <Text style={styles.sectionTitle}>Accesos rápidos</Text>
      <View style={styles.grid}>
        <ActionButton icon="calendar" label="Reservar" color="#3498db" onPress={() => navigation.navigate('Amenidades')} />
        <ActionButton icon="people" label="Visitas" color="#9b59b6" onPress={() => navigation.navigate('RegistroVisitante')} />
        <ActionButton icon="construct" label="Servicios" color="#f1c40f" onPress={() => navigation.navigate('Servicios')} />
        <ActionButton icon="airplane" label="Ausencia" color="#e67e22" onPress={() => navigation.navigate('RegistroAusencia')} />
      </View>

      {/* Próximos Eventos */}
      <Text style={styles.sectionTitle}>Próxima reserva</Text>
      <View style={styles.eventCard}>
        <View style={styles.eventIcon}>
           <Icon name="balloon" size={24} color="#2ecc71" />
        </View>
        <View style={styles.eventInfo}>
          <Text style={styles.eventTitle}>Salón de fiestas</Text>
          <Text style={styles.eventDate}>Sábado, 20 de Ene - 14:00</Text>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>Confirmada</Text>
        </View>
      </View>
    </ScrollView>
  );
};

// Componente auxiliar para botones redondos
const ActionButton = ({ icon, label, color, onPress }) => (
  <TouchableOpacity style={styles.actionItem} onPress={onPress}>
    <View style={[styles.iconCircle, { backgroundColor: color + '20' }]}>
      <Icon name={icon} size={24} color={color} />
    </View>
    <Text style={styles.actionLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, marginBottom: 25 },
  greeting: { fontSize: 26, fontWeight: 'bold', color: '#2c3e50' },
  subGreeting: { fontSize: 16, color: '#95a5a6' },
  alertCard: { backgroundColor: '#fff', padding: 20, borderRadius: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30, borderLeftWidth: 6, borderLeftColor: '#e74c3c', elevation: 4, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 },
  alertLabel: { color: '#e74c3c', fontWeight: 'bold', marginBottom: 5 },
  alertAmount: { fontSize: 28, fontWeight: 'bold', color: '#2c3e50' },
  alertDate: { color: '#7f8c8d', fontSize: 12 },
  payBtn: { backgroundColor: '#e74c3c', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  payBtnText: { color: '#fff', fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#34495e', marginBottom: 15 },
  grid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  actionItem: { alignItems: 'center', width: '22%' },
  iconCircle: { width: 55, height: 55, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  actionLabel: { fontSize: 12, color: '#34495e', fontWeight: '500' },
  eventCard: { backgroundColor: '#fff', padding: 15, borderRadius: 12, flexDirection: 'row', alignItems: 'center', elevation: 2 },
  eventIcon: { width: 40, height: 40, backgroundColor: '#e8f8f5', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  eventInfo: { flex: 1 },
  eventTitle: { fontWeight: 'bold', color: '#2c3e50', fontSize: 16 },
  eventDate: { color: '#7f8c8d', fontSize: 13 },
  statusBadge: { backgroundColor: '#e8f8f5', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  statusText: { color: '#2ecc71', fontSize: 12, fontWeight: 'bold' },
});

export default DashboardScreen;