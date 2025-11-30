import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const notices = [
  { id: '1', title: 'Mantenimiento Elevadores', date: '15 Ene', type: 'Urgente', desc: 'Servicio interrumpido de 9 AM a 2 PM.' },
  { id: '2', title: 'Asamblea General', date: '20 Ene', type: 'Evento', desc: 'Discusión de mejoras en áreas comunes.' },
  { id: '3', title: 'Nuevas Cámaras', date: '12 Ene', type: 'Seguridad', desc: 'Instalación completada en estacionamiento.' },
];

const AvisosScreen = () => {
  const [filter, setFilter] = useState('Todos');

  const getBadgeColor = (type) => {
    switch(type) {
      case 'Urgente': return '#e74c3c';
      case 'Evento': return '#3498db';
      case 'Seguridad': return '#f1c40f';
      default: return '#95a5a6';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Avisos del Condominio</Text>
      
      {/* Filtros */}
      <View style={styles.filterContainer}>
        {['Todos', 'Mantenimiento', 'Eventos'].map(f => (
          <TouchableOpacity 
            key={f} 
            style={[styles.filterChip, filter === f && styles.activeChip]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.activeFilterText]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={notices}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={[styles.typeLine, { backgroundColor: getBadgeColor(item.type) }]} />
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDate}>{item.date}</Text>
              </View>
              <View style={[styles.badge, { backgroundColor: getBadgeColor(item.type) + '20' }]}>
                <Text style={[styles.badgeText, { color: getBadgeColor(item.type) }]}>{item.type}</Text>
              </View>
              <Text style={styles.desc}>{item.desc}</Text>
              <TouchableOpacity>
                <Text style={styles.link}>Ver más detalles</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, marginTop: 20, color: '#2c3e50' },
  filterContainer: { flexDirection: 'row', marginBottom: 20 },
  filterChip: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: '#e0e0e0', marginRight: 10 },
  activeChip: { backgroundColor: '#34495e' },
  filterText: { color: '#555', fontWeight: '600' },
  activeFilterText: { color: '#fff' },
  card: { backgroundColor: '#fff', borderRadius: 10, marginBottom: 15, flexDirection: 'row', overflow: 'hidden', elevation: 2 },
  typeLine: { width: 6, height: '100%' },
  cardContent: { flex: 1, padding: 15 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  cardDate: { color: '#999', fontSize: 12 },
  badge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, marginBottom: 8 },
  badgeText: { fontSize: 10, fontWeight: 'bold' },
  desc: { color: '#666', fontSize: 14, marginBottom: 10 },
  link: { color: '#3498db', fontWeight: 'bold', fontSize: 12 },
});

export default AvisosScreen;