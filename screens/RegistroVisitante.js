import React, { useState } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const RegistroVisitante = () => {
  const [isRecurrent, setIsRecurrent] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.helperText}>Complete la información para generar el código QR de acceso.</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nombre del visitante</Text>
        <TextInput style={styles.input} placeholder="Nombre completo" />
      </View>

      <View style={styles.row}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <Text style={styles.label}>Fecha</Text>
          <TextInput style={styles.input} placeholder="AAAA-MM-DD" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Hora</Text>
          <TextInput style={styles.input} placeholder="00:00" />
        </View>
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>¿Es visita recurrente?</Text>
        <Switch 
          value={isRecurrent} 
          onValueChange={setIsRecurrent}
          trackColor={{false: "#767577", true: "#81b0ff"}}
          thumbColor={isRecurrent ? "#2ecc71" : "#f4f3f4"}
        />
      </View>

      <TouchableOpacity style={styles.saveBtn}>
        <Text style={styles.saveBtnText}>Generar Acceso</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  helperText: { color: '#666', marginBottom: 20 },
  inputGroup: { marginBottom: 20 },
  label: { fontWeight: '600', marginBottom: 8, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, backgroundColor: '#f9f9f9' },
  row: { flexDirection: 'row', marginBottom: 20 },
  switchContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30, paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#eee' },
  switchLabel: { fontSize: 16 },
  saveBtn: { backgroundColor: '#34495e', padding: 18, borderRadius: 12, alignItems: 'center' },
  saveBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});

export default RegistroVisitante;