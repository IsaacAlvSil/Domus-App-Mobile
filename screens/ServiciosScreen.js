import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const services = [
  { id: '1', name: 'Carlos Mendoza', role: 'Plomería y Gas', rating: 5.0, reviews: 24, available: 'Hoy' },
  { id: '2', name: 'María González', role: 'Limpieza Profunda', rating: 4.8, reviews: 18, available: 'Mañana' },
  { id: '3', name: 'Jardines Verdes', role: 'Jardinería', rating: 4.9, reviews: 31, available: 'Esta semana' },
];

const ServiciosScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Directorio de Servicios</Text>
      <FlatList
        data={services}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.avatar}><Text style={{fontSize:20}}>👤</Text></View>
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.role}>{item.role}</Text>
              <View style={styles.ratingRow}>
                <Icon name="star" size={14} color="#f1c40f" />
                <Text style={styles.ratingText}>{item.rating} ({item.reviews} reseñas)</Text>
              </View>
              <Text style={styles.availability}>• Disponible: {item.available}</Text>
            </View>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>Contactar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, marginTop: 10 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 12, flexDirection: 'row', alignItems: 'center', elevation: 2 },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  info: { flex: 1 },
  name: { fontWeight: 'bold', fontSize: 16 },
  role: { color: '#7f8c8d', fontSize: 12, marginBottom: 2 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  ratingText: { fontSize: 12, color: '#555', marginLeft: 4 },
  availability: { fontSize: 11, color: '#2ecc71', marginTop: 2 },
  btn: { backgroundColor: '#34495e', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6 },
  btnText: { color: '#fff', fontSize: 12, fontWeight: 'bold' }
});

export default ServiciosScreen;