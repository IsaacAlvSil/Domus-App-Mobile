import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import DataController from '../controllers/DataController';

const AmenitiesScreen = () => {
  const amenities = DataController.getAmenities();

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.imagePlaceholder} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.hours}>{item.hours}</Text>
        <TouchableOpacity style={styles.reserveButton}>
            <Text style={styles.reserveText}>Reservar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Amenidades</Text>
      <FlatList
        data={amenities}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2} // Grid layout
        columnWrapperStyle={{justifyContent: 'space-between'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 40, marginBottom: 20 },
  card: { width: '48%', backgroundColor: '#fff', borderRadius: 12, marginBottom: 15, overflow: 'hidden' },
  imagePlaceholder: { height: 100, backgroundColor: '#ddd' },
  info: { padding: 10 },
  name: { fontWeight: 'bold', marginBottom: 5 },
  hours: { fontSize: 10, color: '#666', marginBottom: 10 },
  reserveButton: { backgroundColor: '#2e64e5', padding: 8, borderRadius: 6, alignItems: 'center' },
  reserveText: { color: '#fff', fontSize: 12, fontWeight: 'bold' }
});

export default AmenitiesScreen;