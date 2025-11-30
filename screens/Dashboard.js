import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';

export default function Dashboard({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.greeting}>Hola, Gael</Text>
      <Text style={styles.welcome}>Bienvenido de vuelta</Text>
      
      {/* Cuota mensual */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Cuota mensual pendiente</Text>
        <Text style={styles.dueDate}>Vence el 15 de enero</Text>
        <Text style={styles.amount}>$2,450 MXN</Text>
        <TouchableOpacity 
          style={styles.payButton}
          onPress={() => navigation.navigate('Pagos')}
        >
          <Text style={styles.payButtonText}>Pagar</Text>
        </TouchableOpacity>
      </View>
      
      {/* Próxima reserva */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Próxima reserva</Text>
        <Text style={styles.confirmed}>Confirmada</Text>
        <Text style={styles.reservation}>Salón de fiestas</Text>
        <Text style={styles.date}>Sábado, 20 de enero</Text>
        <Text style={styles.time}>14:00 - 18:00</Text>
      </View>
      
      {/* Último aviso */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Último aviso publicado</Text>
        <Text style={styles.timeAgo}>Hace 2 días</Text>
        <Text style={styles.noticeContent}>
          Mantenimiento de elevadores - Se realizará mantenimiento preventivo en los elevadores A y B el próximo lunes de 9:00 a 13:00 hrs.
        </Text>
        <TouchableOpacity>
          <Text style={styles.link}>Ver completo</Text>
        </TouchableOpacity>
      </View>
      
      {/* Accesos rápidos */}
      <View style={styles.quickAccess}>
        <Text style={styles.sectionTitle}>Accesos rápidos</Text>
        <View style={styles.quickAccessGrid}>
          <TouchableOpacity style={styles.quickAccessItem}>
            <Text style={styles.quickAccessText}>Reservar amendad</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickAccessItem}>
            <Text style={styles.quickAccessText}>Agendar Visita</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickAccessItem}>
            <Text style={styles.quickAccessText}>Agendar Servicio</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickAccessItem}>
            <Text style={styles.quickAccessText}>Reportar Ausencia</Text>
          </TouchableOpacity>
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
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  welcome: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  dueDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  payButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  confirmed: {
    color: '#34C759',
    fontWeight: '600',
    marginBottom: 8,
  },
  reservation: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  time: {
    fontSize: 14,
    color: '#666',
  },
  timeAgo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  noticeContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  link: {
    color: '#007AFF',
    fontWeight: '600',
  },
  quickAccess: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  quickAccessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAccessItem: {
    backgroundColor: '#fff',
    width: '48%',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quickAccessText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});