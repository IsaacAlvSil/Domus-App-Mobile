// src/views/PagosScreen.js
// VISTA: Implementa la funcionalidad CRUD (enfocada en READ y DELETE/Gestión de estado) para Pagos
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { CommonStyles, Colors } from '../styles/styles';
import AppController from '../controllers/AppController';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PagoItem = ({ pago, onDelete }) => {
  const isPaid = pago.estado === 'Pagado';
  const statusColor = isPaid ? Colors.pagado : Colors.pendiente;

  return (
    <View style={styles.pagoCard}>
      <View style={styles.pagoInfo}>
        <Text style={styles.pagoMonth}>{pago.mes.split(' ')[0]}</Text>
        <Text style={styles.pagoDate}>{pago.fecha}</Text>
      </View>
      <View style={styles.statusContainer}>
        <Text style={[styles.statusText, { color: statusColor }]}>
          <Icon name={isPaid ? "check-circle" : "alert-circle"} size={14} color={statusColor} /> {pago.estado}
        </Text>
        <Text style={styles.pagoAmount}>${pago.monto.toFixed(2)}</Text>
      </View>
      
      {/* Simulación de la acción de eliminar pago (DELETE) */}
      {!isPaid && (
        <TouchableOpacity onPress={() => onDelete(pago.id)} style={styles.deleteButton}>
          <Icon name="close-circle-outline" size={24} color={Colors.danger} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const PagosScreen = () => {
  const [pagos, setPagos] = useState([]);
  
  // Cargar datos iniciales (READ)
  const fetchPagos = () => {
    // En una app real, aquí se llamaría a la API para obtener el historial.
    const data = AppController.getPagos();
    setPagos(data);
  };

  useEffect(() => {
    fetchPagos();
  }, []);

  // Simulación de eliminación (DELETE)
  const handleDelete = (id) => {
    Alert.alert(
      'Confirmar Gestión',
      'En una aplicación real, esto simularía la cancelación o eliminación de un pago pendiente. ¿Deseas continuar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Simular Eliminación', onPress: () => {
            // Nota: El modelo de Pagos no tiene un delete real, pero podemos simular el refresco de la lista.
            setPagos(prev => prev.filter(p => p.id !== id));
            Alert.alert('Éxito', 'Pago pendiente gestionado/eliminado (simulación).');
          },
          style: 'destructive',
        },
      ],
      { cancelable: false },
    );
  };

  const totalPagado = pagos.filter(p => p.estado === 'Pagado').reduce((sum, p) => sum + p.monto, 0);
  const totalPendiente = pagos.filter(p => p.estado === 'Pendiente').reduce((sum, p) => sum + p.monto, 0);
  const totalAnual = totalPagado + totalPendiente;

  return (
    <ScrollView style={CommonStyles.container}>
      <Text style={CommonStyles.header}>Pagos (Historial y Gestión)</Text>
      
      {/* Resumen de Pagos */}
      <View style={[CommonStyles.card, { marginBottom: 20 }]}>
        <Text style={[CommonStyles.title, { marginBottom: 10 }]}>Resumen 2024</Text>
        <SummaryRow label="Total pagado" value={`$${totalPagado.toFixed(2)}`} color={Colors.pagado} />
        <SummaryRow label="Total pendiente" value={`$${totalPendiente.toFixed(2)}`} color={Colors.pendiente} />
        <View style={styles.separator} />
        <SummaryRow label="Total del año" value={`$${totalAnual.toFixed(2)}`} isBold={true} />
      </View>

      <Text style={[CommonStyles.title, { marginLeft: 10, marginBottom: 5 }]}>Historial de Pagos</Text>
      
      {/* Lista de Pagos (READ) */}
      <FlatList
        data={pagos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PagoItem pago={item} onDelete={handleDelete} />}
        scrollEnabled={false} // Para que se integre bien con el ScrollView principal
      />
      
      {/* Simulación de botón para hacer un pago (CREATE/Acción) */}
      <TouchableOpacity 
        style={[CommonStyles.buttonPrimary, { marginTop: 20, marginBottom: 30 }]} 
        onPress={() => Alert.alert('Simulación', 'Aquí se integraría el formulario de pago para realizar la transacción (CREATE/Acción)')}
      >
        <Text style={CommonStyles.buttonText}><Icon name="currency-usd" size={18} /> Realizar Pago Nuevo</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const SummaryRow = ({ label, value, color, isBold }) => (
  <View style={styles.summaryRow}>
    <Text style={[styles.summaryLabel, isBold && { fontWeight: 'bold' }]}>{label}</Text>
    <Text style={[styles.summaryValue, color && { color }, isBold && { fontWeight: 'bold' }]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  pagoCard: {
    ...CommonStyles.card,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  pagoInfo: {
    flex: 1,
  },
  pagoMonth: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  pagoDate: {
    fontSize: 12,
    color: 'gray',
    marginTop: 2,
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    flexDirection: 'row',
    alignItems: 'center',
  },
  pagoAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    color: Colors.text,
  },
  deleteButton: {
    marginLeft: 15,
    padding: 5,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.text,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 5,
  },
});

export default PagosScreen;