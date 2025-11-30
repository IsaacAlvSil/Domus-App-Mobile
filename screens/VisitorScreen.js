import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch } from 'react-native';

const VisitorScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nuevo Visitante</Text>
      <Text style={styles.subtitle}>Complete la información del visitante</Text>

      <Text style={styles.label}>Nombre del visitante</Text>
      <TextInput style={styles.input} placeholder="Ingrese el nombre completo" />

      <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
        <View style={{width: '48%'}}>
            <Text style={styles.label}>Fecha</Text>
            <TextInput style={styles.input} placeholder="2025-11-06" />
        </View>
        <View style={{width: '48%'}}>
            <Text style={styles.label}>Hora</Text>
            <TextInput style={styles.input} placeholder="03:43" />
        </View>
      </View>

      <Text style={styles.label}>Notas opcionales</Text>
      <TextInput style={[styles.input, {height: 80}]} multiline placeholder="Agregar información adicional..." />

      <View style={styles.switchRow}>
        <Text>Visita recurrente</Text>
        <Switch value={false} />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Registrar visitante</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 20 },
  subtitle: { color: '#666', marginBottom: 30 },
  label: { fontWeight: 'bold', marginBottom: 5, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 20, fontSize: 16 },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  button: { backgroundColor: '#2e64e5', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});

export default VisitorScreen;