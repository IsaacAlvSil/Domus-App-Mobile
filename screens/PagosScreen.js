// src/views/PagosScreen.js
// VISTA: Implementa la funcionalidad de visualización y resumen para Pagos
import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { CommonStyles, Colors } from '../styles/styles';
import AppController from '../controllers/AppController';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Componente para una fila de pago individual
const PagoItem = ({ pago, onDelete }) => {
  const isPaid = pago.estado === 'Pagado';
  const statusColor = isPaid ? Colors.pagado : Colors.pendiente;
  const statusIcon = isPaid ? "check-circle" : "alert-circle";

  return (
    <View style={styles.pagoCard}>
      <View style={styles.pagoInfo}>
        <Text style={styles.pagoMonth}>{pago.mes.split(' ')[0]}</Text>
        <Text style={styles.pagoDate}>{pago.fecha}</Text>
      </View>
      <View style={styles.statusContainer}>
        <Text style={[styles.statusText, { color: statusColor }]}>
          <Icon name={statusIcon} size={14} color={statusColor} /> {pago.estado}
        </Text>
        <Text style={styles.pagoAmount}>${pago.monto.toFixed(2)}</Text>
      </View>
      
      {/* Simulación de la acción de ver detalle/navegación */}
      <TouchableOpacity 
        style={styles.detailArrow} 
        onPress={() => Alert.alert('Detalle', `Monto: $${pago.monto.toFixed(2)}`)}
      >
        <Icon name="chevron-right" size={24} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

// Componente para la pantalla completa
const PagosScreen = () => {
  const [pagos, setPagos] = useState([]);
  const [yearFilter, setYearFilter] = useState('2024'); // Simulación de filtro

  // Carga inicial de datos
  useEffect(() => {
    // En una aplicación real, aquí usaríamos onSnapshot de Firestore
    setPagos(AppController.getPagos());
  }, []);

  // Función para calcular el resumen de pagos
  const paymentSummary = useMemo(() => {
    const filteredPagos = pagos.filter(p => p.fecha.includes(yearFilter));
    const totalPaid = filteredPagos
      .filter(p => p.estado === 'Pagado')
      .reduce((sum, p) => sum + p.monto, 0);
    const totalPending = filteredPagos
      .filter(p => p.estado === 'Pendiente')
      .reduce((sum, p) => sum + p.monto, 0);
    const totalYear = totalPaid + totalPending;

    return {
      totalPaid: totalPaid.toFixed(2),
      totalPending: totalPending.toFixed(2),
      totalYear: totalYear.toFixed(2),
    };
  }, [pagos, yearFilter]);

  // Manejador de eliminación simulado
  const handleDeletePago = (id) => {
    Alert.alert(
      "Simulación de Eliminación",
      "La eliminación de pagos generalmente requiere permisos de administración.",
      [{ text: "OK" }]
    );
    // Para simular la funcionalidad de gestión (no implementada aquí)
    // AppController.deletePago(id);
    // setPagos(AppController.getPagos());
  };

  const currentMonthPending = pagos.find(p => p.estado === 'Pendiente' && p.mes.includes(new Date().getFullYear()));

  return (
    <ScrollView style={CommonStyles.container}>
      <Text style={CommonStyles.title}>Historial de Pagos</Text>
      
      {/* Selector de Año (Simulación de Filtrado) */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filtrar por año</Text>
        <TouchableOpacity style={styles.yearButton} onPress={() => Alert.alert('Filtro', 'Filtro por año no implementado.')}>
          <Text style={styles.yearText}>{yearFilter}</Text>
          <Icon name="chevron-down" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Lista de Pagos */}
      <FlatList
        data={pagos.filter(p => p.fecha.includes(yearFilter)).sort((a, b) => new Date(a.fecha) - new Date(b.fecha))}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PagoItem pago={item} onDelete={handleDeletePago} />}
        scrollEnabled={false} // Para permitir que el ScrollView principal maneje el scroll
      />

      {/* Resumen del Año */}
      <View style={[CommonStyles.card, { marginTop: 20 }]}>
        <Text style={CommonStyles.title}>Resumen {yearFilter}</Text>
        <SummaryRow label="Total pagado" value={`$${paymentSummary.totalPaid}`} color={Colors.pagado} />
        <SummaryRow label="Total pendiente" value={`$${paymentSummary.totalPending}`} color={Colors.pendiente} />
        <View style={styles.summaryDivider} />
        <SummaryRow label="Total del año" value={`$${paymentSummary.totalYear}`} isBold={true} />
      </View>

      {/* Botón de Pagar (Si hay algo pendiente) */}
      <TouchableOpacity 
        style={[CommonStyles.buttonPrimary, { marginBottom: 30, marginTop: 20 }]} 
        onPress={() => Alert.alert('Simulación de Pago', 'Proceso de pago iniciado. (Integración con pasarela de pago).')}
        disabled={!currentMonthPending} // Deshabilitar si no hay pagos pendientes
      >
        <Text style={CommonStyles.buttonText}>
          {currentMonthPending ? `Pagar $${currentMonthPending.monto.toFixed(2)}` : 'No hay pagos pendientes'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Componente auxiliar para las filas de resumen
const SummaryRow = ({ label, value, color, isBold }) => (
  <View style={styles.summaryRow}>
    <Text style={[styles.summaryLabel, isBold && { fontWeight: 'bold' }]}>{label}</Text>
    <Text style={[styles.summaryValue, color && { color }, isBold && { fontWeight: 'bold' }]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  filterLabel: {
    fontSize: 16,
    color: Colors.text,
  },
  yearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#E6E6FA',
  },
  yearText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
    marginRight: 5,
  },
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
    marginBottom: 2,
  },
  pagoAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  detailArrow: {
    paddingLeft: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: Colors.text,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 10,
  },
});

export default PagosScreen;