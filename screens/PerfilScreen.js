import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileItem = ({ label, value }) => (
  <View style={styles.itemContainer}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const PerfilScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}><Text style={{fontSize:40}}>👩🏻‍💼</Text></View>
        <Text style={styles.name}>María González</Text>
        <Text style={styles.type}>Residente - Depto 402</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información Personal</Text>
        <ProfileItem label="Correo" value="maria.gonzalez@email.com" />
        <ProfileItem label="Teléfono" value="+52 55 1234 5678" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuración</Text>
        <TouchableOpacity style={styles.optionRow}>
          <Text style={styles.optionText}>Notificaciones Push</Text>
          <Icon name="toggle" size={30} color="#2ecc71" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionRow}>
          <Text style={styles.optionText}>Editar Perfil</Text>
          <Icon name="chevron-forward" size={24} color="#ccc" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.replace('Login')}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8' },
  header: { backgroundColor: '#fff', alignItems: 'center', padding: 30, marginBottom: 10 },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#e1e1e1', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  name: { fontSize: 22, fontWeight: 'bold', color: '#2c3e50' },
  type: { color: '#7f8c8d' },
  section: { backgroundColor: '#fff', padding: 20, marginBottom: 10 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 15, color: '#34495e' },
  itemContainer: { marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#f0f0f0', paddingBottom: 10 },
  label: { color: '#95a5a6', fontSize: 12, marginBottom: 4 },
  value: { fontSize: 16, color: '#333' },
  optionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 },
  optionText: { fontSize: 16 },
  logoutButton: { margin: 20, alignItems: 'center' },
  logoutText: { color: '#e74c3c', fontWeight: 'bold', fontSize: 16 }
});

export default PerfilScreen;