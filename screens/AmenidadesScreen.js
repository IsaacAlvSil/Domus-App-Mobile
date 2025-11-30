// src/views/AmenidadesScreen.js
// VISTA: Implementa la funcionalidad CRUD (enfocada en READ y UPDATE/Reserva) para Amenidades
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { CommonStyles, Colors } from '../styles/styles';
import AppController from '../controllers/AppController';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// --- Componente para la Tarjeta de Amenidad ---
const AmenidadItem = ({ amenidad, onReserve }) => {
  const isAvailable = amenidad.estado === 'Disponible';
  const statusColor = isAvailable ? Colors.success : Colors.danger;
  const buttonText = isAvailable ? 'Reservar' : 'Cancelar Reserva';

  // Ícono basado en el nombre de la amenidad
  let amenityIcon = 'terrain';
  if (amenidad.nombre.includes('Alberca')) amenityIcon = 'pool';
  else if (amenidad.nombre.includes('Gimnasio')) amenityIcon = 'dumbbell';
  else if (amenidad.nombre.includes('Salón')) amenityIcon = 'party-popper';
  else if (amenidad.nombre.includes('Tenis')) amenityIcon = 'tennis';
  
  return (
    <View style={styles.amenidadCard}>
      <View style={styles.amenidadIconContainer}>
        <Icon name={amenityIcon} size={30} color={Colors.primary} />
      </View>
      
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
        <Text style={styles.reserveButtonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

// --- Componente para la Pantalla Completa ---
const AmenidadesScreen = () => {
  const [amenidades, setAmenidades] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para cargar/actualizar la lista de amenidades
  const fetchAmenidades = () => {
    setAmenidades(AppController.getAmenidades());
    setLoading(false);
  };

  useEffect(() => {
    fetchAmenidades();
  }, []);

  // Manejador de reserva/cancelación (UPDATE)
  const handleReserve = (id, isReserving) => {
    const action = isReserving ? 'reservar' : 'cancelar la reserva de';
    
    Alert.alert(
      isReserving ? "Confirmar Reserva" : "Confirmar Cancelación",
      `¿Estás seguro de que quieres ${action} esta amenidad? (Simulación)`,
      [
        { text: "No", style: "cancel" },
        { 
          text: isReserving ? "Sí, Reservar" : "Sí, Cancelar", 
          onPress: () => {
            // Llama al controlador para cambiar el estado (UPDATE)
            AppController.toggleReservaAmenidad(id);
            fetchAmenidades(); // Refresca la lista
            Alert.alert('Éxito', isReserving ? '¡Amenidad reservada!' : 'Reserva cancelada.');
          }
        }
      ]
    );
  };

  return (
    <View style={CommonStyles.container}>
      <Text style={CommonStyles.title}>Amenidades</Text>
      <Text style={CommonStyles.subtitle}>Reserva las áreas comunes disponibles.</Text>

      {/* Simulación de Filtros (según 12. Reserva Amenidades.pdf) */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterChipActive}>Todos</Text>
        <Text style={styles.filterChip}>Disponible</Text>
        <Text style={styles.filterChip}>Ocupado</Text>
      </View>
      
      {/* Lista de Amenidades (READ) */}
      <FlatList
        data={amenidades}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AmenidadItem amenidad={item} onReserve={handleReserve} />}
        scrollEnabled={true}
      />

      {/* Botón simulación de Agregar nueva amenidad (CREATE) - Solo para Admin */}
      <TouchableOpacity 
        style={[CommonStyles.buttonPrimary, { marginTop: 20, marginBottom: 30 }]} 
        onPress={() => Alert.alert('Simulación', 'Aquí se abriría un formulario para que la administración pueda agregar una nueva amenidad (CREATE).')}
      >
        <Text style={CommonStyles.buttonText}><Icon name="plus" size={18} /> Simular Agregar Amenidad</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 10,
    justifyContent: 'flex-start',
  },
  filterChip: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#EAEAEA',
    color: 'gray',
    fontSize: 14,
  },
  filterChipActive: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: Colors.primary,
    color: Colors.card,
    fontWeight: 'bold',
    fontSize: 14,
  },
  amenidadCard: {
    ...CommonStyles.card,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  amenidadIconContainer: {
    paddingRight: 15,
  },
  amenidadInfo: {
    flex: 1,
    marginRight: 10,
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
  },
  amenidadStatus: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
  },
  reserveButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  reserveButtonText: {
    color: Colors.card,
    fontSize: 14,
    fontWeight: 'bold',
  }
});

export default AmenidadesScreen;