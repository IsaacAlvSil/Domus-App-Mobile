import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import DataController from '../controllers/DataController';

const NoticesScreen = ({ navigation }) => {
  const notices = DataController.getNotices();
  const [filter, setFilter] = useState('Todos');

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('NoticeDetail', { notice: item })}>
      <View style={styles.cardHeader}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.summary} numberOfLines={2}>{item.summary}</Text>
      <Text style={styles.readMore}>Ver más </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Avisos del Condominio</Text>
      
      {/* Filtros */}
      <View style={styles.filters}>
        {['Todos', 'Mantenimiento', 'Eventos', 'Seguridad'].map((cat) => (
            <TouchableOpacity key={cat} onPress={() => setFilter(cat)} 
                style={[styles.filterChip, filter === cat && styles.activeChip]}>
                <Text style={[styles.filterText, filter === cat && styles.activeFilterText]}>{cat}</Text>
            </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={notices}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8', padding: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', marginTop: 40, marginBottom: 20 },
  filters: { flexDirection: 'row', marginBottom: 20 },
  filterChip: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, backgroundColor: '#e0e0e0', marginRight: 10 },
  activeChip: { backgroundColor: '#333' },
  filterText: { color: '#333' },
  activeFilterText: { color: '#fff' },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 15 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  category: { color: '#2e64e5', fontWeight: 'bold', textTransform: 'uppercase', fontSize: 12 },
  date: { color: '#999', fontSize: 12 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  summary: { color: '#666', lineHeight: 20 },
  readMore: { marginTop: 10, color: '#2e64e5', fontWeight: '600' }
});

export default NoticesScreen;