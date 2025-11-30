// src/views/AmenidadesScreen.js
// VISTA: Implementa la funcionalidad CRUD (enfocada en READ y UPDATE/Reserva) para Amenidades
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { CommonStyles, Colors } from '../styles/styles';
import AppController from '../controllers/AppController';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AmenidadItem = ({ amenidad, onReserve }) => {
  const isAvailable = amenidad.estado === 'Disponible';
  const statusColor = isAvailable ? Colors.success : Colors.danger;
  const buttonText = isAvailable ? 'Reservar' : 'Cancelar Reserva';

  return (
    <View style={styles.amenidadCard}>
      <View style={styles.amenidadInfo}>
        <Text style={styles.amenidadTitle}>{amenidad.nombre}</Text>
        <Text style={styles.amenidadHorario}><Icon name="clock-outline" size={14} /> {amenidad.horario}</Text>
        <Text style={[styles.amenidadStatus, { color: statusColor }]}>
          <Icon name="circle-slice-8" size={12} color={statusColor} /> {amenidad.estado}
        </Text>
      </View>
      <TouchableOpacity 
        style={[styles.reserveButton, { backgroundColor: isAvailable ? Colors.primary : Colors.danger }]}
        onPress={() => onReserve(amenidad.id, isAvailable)}
      >
        <Text style={CommonStyles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const AmenidadesScreen = () => {
  const [amenidades, setAmenidades] = useState([]);
  
  // Cargar datos iniciales (READ)
  const fetchAmenidades = () => {
    const data = AppController.getAmenidades();
    setAmenidades([...data]); // Clonar para forzar re-render
  };

  useEffect(() => {
    fetchAmenidades();
  }, []);

  // Simulación de reserva (UPDATE)
  const handleReserve = (id, isAvailable) => {
    const actionText = isAvailable ? 'Reservar' : 'Cancelar la reserva de';
    
    Alert.alert(
      'Confirmar Acción',
      `¿Estás seguro de que deseas ${actionText} esta amenidad?`,
      [
        { text: 'No', style: 'cancel' },
        { 
          text: isAvailable ? 'Reservar' : 'Cancelar', 
          onPress: () => {
            const updatedAmenidad = AppController.toggleReservaAmenidad(id);
            if (updatedAmenidad) {
              fetchAmenidades(); // Refrescar la lista
              Alert.alert('Éxito', `Reserva ${isAvailable ? 'confirmada' : 'cancelada'} para ${updatedAmenidad.nombre}.`);
            }
          },
          style: isAvailable ? 'default' : 'destructive',
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <View style={CommonStyles.container}>
      <Text style={CommonStyles.header}>Amenidades (Reservas CRUD)</Text>
      
      <Text style={[CommonStyles.subtitle, { marginLeft: 10, marginBottom: 10 }]}>
        Aquí puedes ver y gestionar las reservas de las áreas comunes.
      </Text>
      
      {/* Lista de Amenidades (READ) */}
      <FlatList
        data={amenidades}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AmenidadItem amenidad={item} onReserve={handleReserve} />}
      />

      {/* Botón simulación de Agregar nueva amenidad (CREATE) */}
      <TouchableOpacity 
        style={[CommonStyles.buttonPrimary, { marginTop: 20, marginBottom: 30 }]} 
        onPress={() => Alert.alert('Simulación', 'Aquí se abriría un formulario para que la administración (no el usuario) pueda agregar una nueva amenidad (CREATE).')}
      >
        <Text style={CommonStyles.buttonText}><Icon name="plus" size={18} /> Simular Agregar Amenidad</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  amenidadCard: {
    ...CommonStyles.card,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  amenidadInfo: {
    flex: 1,
  },
  amenidadTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  amenidadHorario: {
    fontSize: 12,
    color: 'gray',
    marginTop: 2,
    marginBottom: 5,
  },
  amenidadStatus: {
    fontSize: 14,
    fontWeight: '600',
    flexDirection: 'row',
    alignItems: 'center',
  },
  reserveButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginLeft: 15,
  },
});

export default AmenidadesScreen;