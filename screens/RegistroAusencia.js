import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const RegistroAusencia = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Notificar Ausencia</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>Fecha de Salida</Text>
        <TextInput style={styles.input} placeholder="2024-11-15" />
        
        <Text style={styles.label}>Fecha de Regreso</Text>
        <TextInput style={styles.input} placeholder="2024-11-20" />
      </View>

      <Text style={styles.sectionHeader}>Contacto de Emergencia</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Nombre Completo</Text>
        <TextInput style={styles.input} placeholder="Nombre de familiar" />
        
        <Text style={styles.label}>Teléfono</Text>
        <TextInput style={styles.input} keyboardType="phone-pad" placeholder="+52..." />
      </View>

      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Notificar a Seguridad</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  sectionHeader: { fontSize: 16, fontWeight: 'bold', marginVertical: 15, color: '#555' },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 10, elevation: 2 },
  label: { color: '#7f8c8d', marginBottom: 5, fontSize: 12 },
  input: { borderBottomWidth: 1, borderBottomColor: '#eee', paddingVertical: 8, marginBottom: 15, fontSize: 16, color: '#333' },
  btn: { backgroundColor: '#e67e22', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 30 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});

export default RegistroAusencia;