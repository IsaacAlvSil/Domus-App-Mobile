// src/views/AvisosScreen.js
// VISTA: Implementa la funcionalidad CRUD para Avisos
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Alert, Modal, Pressable } from 'react-native';
import { CommonStyles, Colors } from '../styles/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppController from '../controllers/AppController';

const AvisoItem = ({ aviso, onEdit, onDelete }) => (
  <View style={styles.avisoCard}>
    <Text style={styles.avisoTitle}>{aviso.titulo}</Text>
    <Text style={styles.avisoDate}>{aviso.fecha} - {aviso.categoria}</Text>
    <Text style={styles.avisoContent} numberOfLines={2}>{aviso.contenido}</Text>
    <View style={styles.actionsContainer}>
      <TouchableOpacity onPress={() => onEdit(aviso)} style={[styles.actionButton, { backgroundColor: '#FFD70030' }]}>
        <Icon name="pencil" size={18} color="#FFD700" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(aviso.id)} style={[styles.actionButton, { backgroundColor: '#DC354530', marginLeft: 10 }]}>
        <Icon name="trash-can-outline" size={18} color={Colors.danger} />
      </TouchableOpacity>
    </View>
  </View>
);

const AvisosScreen = () => {
  const [avisos, setAvisos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentAviso, setCurrentAviso] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [categoria, setCategoria] = useState('');

  // Cargar datos iniciales (READ)
  const fetchAvisos = () => {
    const data = AppController.getAvisos();
    setAvisos(data);
  };

  useEffect(() => {
    fetchAvisos();
  }, []);

  // Función para abrir el modal en modo Crear o Editar
  const openModal = (aviso = null) => {
    setCurrentAviso(aviso);
    setTitulo(aviso ? aviso.titulo : '');
    setContenido(aviso ? aviso.contenido : '');
    setCategoria(aviso ? aviso.categoria : '');
    setModalVisible(true);
  };

  // Guardar (CREATE/UPDATE)
  const handleSave = () => {
    if (!titulo.trim() || !contenido.trim() || !categoria.trim()) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    const newAvisoData = {
      titulo,
      contenido,
      categoria,
      fecha: new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }),
      prioridad: 'Normal',
      autor: 'Residente',
    };

    if (currentAviso) {
      // UPDATE
      AppController.actualizarAviso(currentAviso.id, newAvisoData);
    } else {
      // CREATE
      AppController.crearAviso(newAvisoData);
    }

    fetchAvisos(); // Refrescar la lista
    setModalVisible(false);
  };

  // Eliminar (DELETE)
  const handleDelete = (id) => {
    Alert.alert(
      'Confirmar Eliminación',
      '¿Estás seguro de que quieres eliminar este aviso?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: () => {
            AppController.eliminarAviso(id);
            fetchAvisos(); // Refrescar la lista
          },
          style: 'destructive',
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <View style={CommonStyles.container}>
      <Text style={CommonStyles.header}>Avisos del Condominio (CRUD)</Text>
      
      {/* Botón CREATE */}
      <TouchableOpacity style={CommonStyles.buttonPrimary} onPress={() => openModal(null)}>
        <Text style={CommonStyles.buttonText}><Icon name="plus" size={18} /> Crear Nuevo Aviso</Text>
      </TouchableOpacity>

      {/* Lista de Avisos (READ) */}
      <FlatList
        data={avisos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AvisoItem
            aviso={item}
            onEdit={openModal}
            onDelete={handleDelete}
          />
        )}
        contentContainerStyle={{ paddingVertical: 10 }}
      />

      {/* Modal para Crear/Editar */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{currentAviso ? 'Editar Aviso' : 'Crear Nuevo Aviso'}</Text>
            
            <TextInput
              style={CommonStyles.input}
              placeholder="Título"
              value={titulo}
              onChangeText={setTitulo}
            />
            <TextInput
              style={[CommonStyles.input, { height: 100 }]}
              placeholder="Contenido/Descripción"
              value={contenido}
              onChangeText={setContenido}
              multiline
            />
             <TextInput
              style={CommonStyles.input}
              placeholder="Categoría (Ej: Mantenimiento, Eventos)"
              value={categoria}
              onChangeText={setCategoria}
            />

            <View style={styles.modalButtonContainer}>
              <Pressable
                style={[CommonStyles.buttonPrimary, styles.modalButton, { backgroundColor: '#AAA' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={CommonStyles.buttonText}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={[CommonStyles.buttonPrimary, styles.modalButton]}
                onPress={handleSave}
              >
                <Text style={CommonStyles.buttonText}>{currentAviso ? 'Guardar Cambios' : 'Crear Aviso'}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  avisoCard: {
    ...CommonStyles.card,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  avisoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  avisoDate: {
    fontSize: 12,
    color: 'gray',
  },
  avisoContent: {
    fontSize: 13,
    color: '#555',
    marginTop: 5,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 15,
    top: 15,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: Colors.primary,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
  }
});

export default AvisosScreen;