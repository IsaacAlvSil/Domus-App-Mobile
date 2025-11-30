import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarPlaceholder}><Text style={{fontSize: 40}}>MG</Text></View>
        <Text style={styles.name}>María González</Text>
        <Text style={styles.role}>Residente</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información Personal</Text>
        <View style={styles.row}>
            <Text style={styles.label}>Departamento</Text>
            <Text style={styles.value}>Recursos Humanos</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.label}>Correo</Text>
            <Text style={styles.value}>maria.gonzalez@empresa.com</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ajustes</Text>
        <TouchableOpacity style={styles.option}>
            <Text>Notificaciones push</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
            <Text>Métodos de Pago</Text>
            <Text style={{color:'#999', fontSize:12}}>Próximamente</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.replace('Login')}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { alignItems: 'center', padding: 40, backgroundColor: '#f8f9fa' },
  avatarPlaceholder: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#ddd', justifyContent:'center', alignItems:'center', marginBottom: 15 },
  name: { fontSize: 22, fontWeight: 'bold' },
  role: { color: '#666', marginTop: 5 },
  section: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  row: { marginBottom: 15 },
  label: { color: '#888', fontSize: 12, marginBottom: 2 },
  value: { fontSize: 16, color: '#333' },
  option: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15 },
  logoutButton: { margin: 20, padding: 15, alignItems: 'center' },
  logoutText: { color: 'red', fontSize: 16 }
});

export default ProfileScreen;