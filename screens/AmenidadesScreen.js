import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

const amenities = [
  { id: '1', name: 'Alberca', time: '6:00 AM - 10:00 PM', status: 'Disponible' },
  { id: '2', name: 'Gimnasio', time: '5:00 AM - 11:00 PM', status: 'Ocupado' },
  { id: '3', name: 'Salón de Eventos', time: '24 Horas', status: 'Disponible' },
];

const AmenidadesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reservar Amenidad</Text>
      <FlatList
        data={amenities}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Placeholder de imagen */}
            <View style={styles.imagePlaceholder} /> 
            <View style={styles.info}>
              <View style={styles.row}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={[styles.statusDot, { backgroundColor: item.status === 'Disponible' ? '#2ecc71' : '#e74c3c' }]} />
              </View>
              <Text style={styles.time}>{item.time}</Text>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Reservar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, marginTop: 10 },
  card: { backgroundColor: '#fff', borderRadius: 12, marginBottom: 20, overflow: 'hidden', elevation: 3 },
  imagePlaceholder: { height: 120, backgroundColor: '#bdc3c7' }, // Aquí iría tu <Image source={{uri...}} />
  info: { padding: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  name: { fontSize: 18, fontWeight: 'bold', color: '#2c3e50' },
  statusDot: { width: 10, height: 10, borderRadius: 5 },
  time: { color: '#7f8c8d', marginBottom: 15 },
  btn: { backgroundColor: '#2ecc71', padding: 10, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' }
});

export default AmenidadesScreen;