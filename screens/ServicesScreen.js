import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DataController from '../controllers/DataController';

const ServicesScreen = () => {
  const services = DataController.getServices();

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.avatarPlaceholder} />
        <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.service}>{item.service}</Text>
            <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color="#f1c40f" />
                <Text style={styles.rating}>{item.rating} ({item.reviews} reseñas)</Text>
            </View>
            <Text style={styles.availability}>• Disponible {item.available}</Text>
        </View>
        <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactText}>Contactar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Servicios Recomendados</Text>
      
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#999" />
        <TextInput placeholder="Buscar servicio o proveedor..." style={styles.input} />
      </View>

      <View style={styles.filters}>
        <TouchableOpacity style={[styles.chip, styles.activeChip]}><Text style={styles.activeChipText}>Todos</Text></TouchableOpacity>
        <TouchableOpacity style={styles.chip}><Text>Plomería</Text></TouchableOpacity>
        <TouchableOpacity style={styles.chip}><Text>Jardinería</Text></TouchableOpacity>
      </View>

      <FlatList
        data={services}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 20, marginBottom: 15 },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 8, padding: 10, marginBottom: 15, borderWidth: 1, borderColor: '#ddd' },
  input: { marginLeft: 10, flex: 1 },
  filters: { flexDirection: 'row', marginBottom: 20 },
  chip: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, backgroundColor: '#e0e0e0', marginRight: 10 },
  activeChip: { backgroundColor: '#333' },
  activeChipText: { color: '#fff' },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 15, elevation: 1 },
  cardContent: { flexDirection: 'row', alignItems: 'center' },
  avatarPlaceholder: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#ddd', marginRight: 15 },
  info: { flex: 1 },
  name: { fontWeight: 'bold', fontSize: 16 },
  service: { color: '#666', fontSize: 14, marginBottom: 2 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  rating: { fontSize: 12, color: '#444', marginLeft: 4 },
  availability: { fontSize: 12, color: 'green', fontWeight: '500' },
  contactButton: { backgroundColor: '#eef2ff', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 6 },
  contactText: { color: '#2e64e5', fontWeight: 'bold', fontSize: 12 }
});

export default ServicesScreen;