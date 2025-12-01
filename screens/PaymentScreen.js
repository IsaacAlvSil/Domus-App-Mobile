import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import PagoController from '../controllers/pagoController';

const controller = new PagoController();

const PaymentScreen = ({ navigation }) => {
  const [pago, setPago] = useState(null);
  const [loading, setLoading] = useState(true);
  const [procesando, setProcesando] = useState(false);

  const cargarDatos = useCallback(async () => {
    try {
      setLoading(true);
      const data = await controller.obtenerPagoActual();
      setPago(data);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await controller.initialize();
      await cargarDatos();
      controller.addListener(cargarDatos);
    };

    init();

    return () => controller.removeListener(cargarDatos);
  }, []);

  const handlePagar = async () => {
    if (!pago || procesando) return;

    Alert.alert(
      "Confirmar Pago",
      `¿Deseas pagar el monto de $${pago.monto}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Pagar", 
          onPress: async () => {
            try {
              setProcesando(true);
              await controller.realizarPago(pago.id); 
              Alert.alert("Éxito", "El pago se ha registrado correctamente.");
            } catch (error) {
              Alert.alert("Error", "No se pudo realizar el pago");
            } finally {
              setProcesando(false);
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#28a745" />
      </View>
    );
  }

  if (!pago) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No hay pagos pendientes</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Pagos</Text>
      
      <View style={styles.mainCard}>
        <Text style={styles.label}>Monto a Pagar</Text>
        <Text style={styles.amount}>${pago.monto} <Text style={{fontSize: 20, color: '#666'}}>MXN</Text></Text>
        
        <View style={[styles.statusContainer, pago.monto === 0 && styles.statusPaid]}>
             <Text style={[styles.statusText, pago.monto === 0 && styles.textPaid]}>
                {pago.estado}
             </Text>
        </View>
        <Text style={styles.date}>Fecha Límite: {pago.fecha_limite}</Text>
      </View>

      <Text style={styles.sectionTitle}>Detalles del Pago</Text>
      <View style={styles.detailRow}>
        <Text>Concepto</Text><Text>{pago.concepto}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text>Periodo</Text><Text>{pago.periodo}</Text>
      </View>
      <View style={[styles.detailRow, {borderBottomWidth: 0}]}>
        <Text style={{fontWeight:'bold'}}>Total</Text>
        <Text style={{fontWeight:'bold'}}>${pago.monto}</Text>
      </View>

      <TouchableOpacity 
        style={[styles.payButton, (pago.monto === 0 || procesando) && styles.payButtonDisabled]}
        onPress={handlePagar}
        disabled={pago.monto === 0 || procesando}
      >
        <Text style={styles.payButtonText}>
            {pago.monto === 0 ? "Pagado Exitósamente" : "Pagar Ahora"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('PaymentHistory')} style={styles.historyLink}>
        <Text style={styles.historyText}>Ver Historial de Pagos</Text>
      </TouchableOpacity>

      {pago.monto === 0 && (
      <TouchableOpacity 
        onPress={async () => {
          await controller.restablecerDeuda(pago.id);
        }} 
        style={{marginTop: 30, alignItems: 'center', opacity: 0.5}}
      >
        <Text style={{color: 'red'}}>🔄 Resetear Deuda</Text>
      </TouchableOpacity>
    )}
      
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
  statusPaid: { backgroundColor: '#d4edda' },
  statusText: { color: '#856404', fontWeight: 'bold' },
  textPaid: { color: '#155724' },
  date: { color: '#666' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 1, borderColor: '#eee' },
  payButton: { backgroundColor: '#28a745', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  payButtonDisabled: { backgroundColor: '#ccc' },
  payButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  historyLink: { marginTop: 20, alignItems: 'center' },
  historyText: { color: '#2e64e5', fontSize: 16 }
});

export default PaymentScreen;