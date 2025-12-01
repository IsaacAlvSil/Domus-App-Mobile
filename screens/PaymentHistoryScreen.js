import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Modal, TextInput, ActivityIndicator, ScrollView } from 'react-native';
import PagoController from '../controllers/pagoController';

const controller = new PagoController();

const PaymentHistoryScreen = () => {
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [selectedYear, setSelectedYear] = useState('2025');
  const [loading, setLoading] = useState(true);
  
  // Estados para el Modal (Formulario)
  const [modalVisible, setModalVisible] = useState(false);
  const [esEdicion, setEsEdicion] = useState(false);
  const [idEdicion, setIdEdicion] = useState(null);
  
  // Formulario
  const [form, setForm] = useState({
    concepto: '', periodo: '', monto: '', estado: 'Pendiente', fecha_limite: ''
  });

  // --- 1. CARGA DE DATOS ---
  const cargarDatos = useCallback(async () => {
    setLoading(true);
    try {
      const data = await controller.obtenerHistorialCompleto();
      setHistory(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    controller.initialize();
    cargarDatos();
    controller.addListener(cargarDatos);
    return () => controller.removeListener(cargarDatos);
  }, []);

  useEffect(() => {
    const filtrados = history.filter(item => item.fecha_limite.includes(selectedYear));
    setFilteredHistory(filtrados);
  }, [history, selectedYear]);

  const resumen = filteredHistory.reduce((acc, item) => {
    const monto = item.monto || 0;
    if (item.estado === 'Pagado' || item.monto === 0) {
      acc.pagado += 1500; 
      if(monto === 0) acc.pagado += 0; 
    } else {
      acc.pendiente += monto;
    }
    acc.total += monto;
    return acc;
  }, { pagado: 0, pendiente: 0, total: 0 });

  const totalPendiente = filteredHistory.filter(i => i.estado !== 'Pagado' && i.monto > 0).reduce((sum, i) => sum + i.monto, 0);
  const totalItems = filteredHistory.length; 
  const totalPagado = filteredHistory.filter(i => i.estado === 'Pagado' || i.monto === 0).length * 1500; 
  const totalAnual = totalPendiente + totalPagado;


  const abrirModal = (item = null) => {
    if (item) {
      setEsEdicion(true);
      setIdEdicion(item.id);
      setForm({
        concepto: item.concepto,
        periodo: item.periodo,
        monto: item.monto.toString(),
        estado: item.estado,
        fecha_limite: item.fecha_limite
      });
    } else {
      setEsEdicion(false);
      setIdEdicion(null);
      setForm({
        concepto: 'Cuota Mensual',
        periodo: 'Mes Año',
        monto: '1500',
        estado: 'Pendiente',
        fecha_limite: `${selectedYear}-01-30`
      });
    }
    setModalVisible(true);
  };

  const guardarCambios = async () => {
    if (!form.concepto || !form.monto) return Alert.alert("Error", "Completa los campos");
    
    try {
      if (esEdicion) {
        await controller.editarPagoExistente(idEdicion, form);
      } else {
        await controller.guardarNuevoPago(form);
      }
      setModalVisible(false);
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar");
    }
  };

  const eliminarItem = (id) => {
    Alert.alert("Eliminar", "¿Seguro?", [
      { text: "Cancelar" },
      { text: "Eliminar", onPress: () => controller.borrarPago(id), style: "destructive" }
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <View style={{flex: 1}}>
        <Text style={styles.month}>{item.periodo}</Text>
        <Text style={styles.concept}>{item.concepto}</Text>
        <Text style={styles.datePaid}>{item.fecha_limite}</Text>
      </View>
      
      <View style={{alignItems: 'flex-end'}}>
        <View style={[styles.badge, item.estado === 'Pendiente' ? styles.pendingBadge : styles.paidBadge]}>
             <Text style={[styles.badgeText, item.estado === 'Pendiente' ? styles.pendingText : styles.paidText]}>
                {item.estado === 'Pagado' || item.monto === 0 ? '✓ Pagado' : 'Pendiente'}
             </Text>
        </View>
        <Text style={styles.amount}>${item.monto.toFixed(2)}</Text>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity onPress={() => abrirModal(item)}>
            <Text style={styles.editLink}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => eliminarItem(item.id)}>
            <Text style={styles.deleteLink}>Borrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <View>
            <Text style={styles.filterLabel}>Filtrar por año</Text>
            <View style={styles.yearSelector}>
                <TouchableOpacity onPress={() => setSelectedYear(selectedYear === '2024' ? '2025' : '2024')}>
                     <Text style={styles.yearText}>{selectedYear} ▾</Text>
                </TouchableOpacity>
            </View>
        </View>
        
        <TouchableOpacity style={styles.addButton} onPress={() => abrirModal(null)}>
            <Text style={styles.addButtonText}>+ Nuevo Pago</Text>
        </TouchableOpacity>
      </View>

      {loading ? <ActivityIndicator size="large" color="#28a745"/> : (
        <FlatList
            data={filteredHistory}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.list}
            ListEmptyComponent={<Text style={{textAlign:'center', marginTop: 20, color:'#999'}}>No hay registros en {selectedYear}</Text>}
        />
      )}

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Resumen {selectedYear}</Text>
        <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total pagado (est.)</Text>
            <Text style={styles.summaryValue}>${totalPagado.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total pendiente</Text>
            <Text style={styles.summaryValue}>${totalPendiente.toFixed(2)}</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total del año</Text>
            <Text style={styles.totalValue}>${totalAnual.toFixed(2)}</Text>
        </View>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ScrollView>
                <Text style={styles.modalTitle}>{esEdicion ? "Editar Pago" : "Nuevo Pago"}</Text>
                
                <TextInput style={styles.input} placeholder="Concepto" value={form.concepto} onChangeText={t => setForm({...form, concepto: t})} />
                <TextInput style={styles.input} placeholder="Periodo (Ej: Enero 2025)" value={form.periodo} onChangeText={t => setForm({...form, periodo: t})} />
                <TextInput style={styles.input} placeholder="Monto" keyboardType="numeric" value={form.monto} onChangeText={t => setForm({...form, monto: t})} />
                <TextInput style={styles.input} placeholder="Fecha (YYYY-MM-DD)" value={form.fecha_limite} onChangeText={t => setForm({...form, fecha_limite: t})} />
                
                <View style={{flexDirection:'row', justifyContent:'space-around', marginBottom: 15}}>
                    <TouchableOpacity onPress={() => setForm({...form, estado: 'Pendiente', monto: '1500'})} style={[styles.statusBtn, form.estado==='Pendiente' && styles.statusBtnActive]}><Text>Pendiente</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => setForm({...form, estado: 'Pagado', monto: '0'})} style={[styles.statusBtn, form.estado==='Pagado' && styles.statusBtnActive]}><Text>Pagado</Text></TouchableOpacity>
                </View>

                <View style={styles.modalButtons}>
                    <TouchableOpacity style={[styles.btn, styles.btnCancel]} onPress={() => setModalVisible(false)}>
                        <Text style={{color:'#333'}}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, styles.btnSave]} onPress={guardarCambios}>
                        <Text style={{color:'#fff'}}>Guardar</Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>
            </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  filterContainer: { padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  filterLabel: { fontSize: 12, color: '#666' },
  yearSelector: { backgroundColor: '#f0f0f0', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 8, marginTop: 5 },
  yearText: { fontWeight: 'bold' },
  addButton: { backgroundColor: '#28a745', padding: 10, borderRadius: 8 },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  
  list: { paddingHorizontal: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 1, borderColor: '#eee' },
  month: { fontSize: 16, fontWeight: 'bold' },
  concept: { fontSize: 14, color: '#444' },
  datePaid: { color: '#888', fontSize: 12, marginTop: 2 },
  amount: { fontSize: 16, fontWeight: 'bold', marginTop: 5, textAlign: 'right' },
  
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, marginBottom: 5, alignSelf: 'flex-end' },
  paidBadge: { backgroundColor: '#d4edda' },
  pendingBadge: { backgroundColor: '#fff3cd' },
  paidText: { color: '#155724', fontSize: 10, fontWeight: 'bold' },
  pendingText: { color: '#856404', fontSize: 10, fontWeight: 'bold' },
  
  actionButtons: { flexDirection: 'row', gap: 15, marginTop: 5, justifyContent: 'flex-end' },
  editLink: { color: '#007AFF', fontSize: 12 },
  deleteLink: { color: '#FF3B30', fontSize: 12 },

  summaryContainer: { padding: 20, backgroundColor: '#f9f9f9', borderTopWidth: 1, borderColor: '#eee' },
  summaryTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  summaryLabel: { color: '#666' },
  summaryValue: { fontWeight: '500' },
  totalRow: { marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderColor: '#ddd' },
  totalLabel: { fontWeight: 'bold', fontSize: 16 },
  totalValue: { fontWeight: 'bold', fontSize: 16, color: '#2e64e5' },

  // Estilos del Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#fff', borderRadius: 15, padding: 20, elevation: 5 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 15, backgroundColor: '#f9f9f9' },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  btn: { flex: 1, padding: 15, borderRadius: 8, alignItems: 'center', marginHorizontal: 5 },
  btnCancel: { backgroundColor: '#e0e0e0' },
  btnSave: { backgroundColor: '#28a745' },
  statusBtn: { padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 5, width: '45%', alignItems:'center' },
  statusBtnActive: { backgroundColor: '#e8f5e9', borderColor: '#28a745' }
});

export default PaymentHistoryScreen;