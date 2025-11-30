import React from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const AbsenceScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Notificar Ausencia</Text>
      
      <View style={styles.card}>
        <View style={styles.row}>
            <View style={styles.halfInput}>
                <Text style={styles.label}>Fecha de salida</Text>
                <TextInput style={styles.input} placeholder="2024-11-15" />
            </View>
            <View style={styles.halfInput}>
                <Text style={styles.label}>Fecha de regreso</Text>
                <TextInput style={styles.input} placeholder="2024-11-20" />
            </View>
        </View>

        <Text style={styles.sectionHeader}>Contacto de emergencia</Text>
        <Text style={styles.label}>Nombre completo</Text>
        <TextInput style={styles.input} />
        
        <Text style={styles.label}>Número de teléfono</Text>
        <TextInput style={styles.input} keyboardType="phone-pad" />

        <View style={styles.switchRow}>
            <Text>Notificar a Seguridad del condominio</Text>
            <Switch value={true} trackColor={{false: "#767577", true: "#2e64e5"}} />
        </View>
        
        <View style={styles.checkboxRow}>
            <View style={styles.checkbox} /> 
            <Text style={styles.checkboxText}>Enviar copia al correo registrado</Text>
        </View>

        <TouchableOpacity style={styles.sendButton}>
            <Text style={styles.sendText}>Enviar notificación</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.historyTitle}>Ausencias anteriores</Text>
      
      {/* Item de Historial */}
      <View style={styles.historyItem}>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={styles.historyDate}>Oct 15 - Oct 22, 2024</Text>
            <Text style={styles.statusFinalized}>Finalizada</Text>
        </View>
        <Text style={styles.historyDetail}>Contacto: María González</Text>
        <Text style={styles.historyDetail}>Notificado a: Seguridad</Text>
      </View>

      <View style={styles.historyItem}>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={styles.historyDate}>Nov 10 - Nov 25, 2024</Text>
            <Text style={styles.statusActive}>Vigente</Text>
        </View>
        <Text style={styles.historyDetail}>Contacto: Carlos Ruiz</Text>
        <Text style={styles.historyDetail}>Notificado a: Ambos</Text>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 20, marginBottom: 20 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 20, marginBottom: 25 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  halfInput: { width: '48%' },
  label: { fontWeight: 'bold', marginBottom: 5, color: '#444' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, marginBottom: 15, backgroundColor: '#f9f9f9' },
  sectionHeader: { fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 15, color: '#2e64e5' },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  checkbox: { width: 20, height: 20, borderWidth: 1, borderColor: '#999', marginRight: 10, borderRadius: 4 },
  checkboxText: { color: '#666' },
  sendButton: { backgroundColor: '#2e64e5', padding: 15, borderRadius: 10, alignItems: 'center' },
  sendText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  historyTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  historyItem: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10 },
  historyDate: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
  historyDetail: { color: '#666', fontSize: 13, marginTop: 2 },
  statusFinalized: { color: '#666', fontWeight: 'bold' },
  statusActive: { color: 'green', fontWeight: 'bold' }
});

export default AbsenceScreen;