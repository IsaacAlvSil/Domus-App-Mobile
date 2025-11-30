// src/views/AvisosScreen.js
// VISTA: Implementa la funcionalidad CRUD para Avisos
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Alert, Modal, Pressable, ScrollView } from 'react-native';
import { CommonStyles, Colors } from '../styles/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppController from '../controllers/AppController';

// --- Componente para la Tarjeta de Aviso ---
const AvisoItem = ({ aviso, onEdit, onDelete, isDetailView }) => {
  // Función para simular la visualización de un aviso detallado (según 8. Detalle de Aviso.pdf)
  const handleViewDetail = () => {
    Alert.alert(
      aviso.titulo,
      `${aviso.contenido}\n\nCategoría: ${aviso.categoria}\nPrioridad: ${aviso.prioridad}\nPublicado por: ${aviso.autor}`,
      [{ text: "OK" }]
    );
  };

  return (
    <View style={styles.avisoCard}>
      <View style={styles.avisoInfo}>
        <Text style={styles.avisoTitle}>{aviso.titulo}</Text>
        <Text style={styles.avisoDate}>{aviso.fecha} - {aviso.categoria}</Text>
        <Text style={styles.avisoContent} numberOfLines={2}>{aviso.contenido}</Text>
      </View>

      {/* Acciones de Edición/Eliminación (Simulado para Administración) */}
      <View style={styles.actionsContainer}>
        {/* Simulación de botón "Ver más" */}
        <TouchableOpacity onPress={handleViewDetail} style={[styles.actionButton, { backgroundColor: '#6A5ACD15', marginRight: 10 }]}>
          <Text style={{color: Colors.primary, fontWeight: 'bold', fontSize: 12}}>Ver más</Text>
        </TouchableOpacity>

        {/* Los siguientes botones solo serían visibles para roles de Administrador */}
        <TouchableOpacity onPress={() => onEdit(aviso)} style={[styles.actionButton, { backgroundColor: '#FFD70030', marginRight: 10 }]}>
          <Icon name="pencil" size={18} color="#FFD700" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(aviso.id)} style={[styles.actionButton, { backgroundColor: '#DC354530' }]}>
          <Icon name="trash-can-outline" size={18} color={Colors.danger} />
        </TouchableOpacity>
      </View>
    </View>
  );
};


// --- Componente para la Pantalla Completa ---
const AvisosScreen = () => {
  const [avisos, setAvisos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingAviso, setEditingAviso] = useState(null); // Para el formulario de edición/creación

  // Carga inicial de datos
  useEffect(() => {
    // En una aplicación real, aquí usaríamos onSnapshot de Firestore
    setAvisos(AppController.getAvisos());
  }, []);

  // Iniciar edición
  const handleEdit = (aviso) => {
    setEditingAviso(aviso);
    setModalVisible(true);
  };

  // Iniciar creación
  const handleCreate = () => {
    setEditingAviso({ id: null, titulo: '', contenido: '', categoria: 'General', prioridad: 'Normal', fecha: new Date().toLocaleDateString('es-ES'), autor: 'Admin Simulado' });
    setModalVisible(true);
  };

  // Guardar/Actualizar
  const handleSave = (data) => {
    if (data.id) {
      // UPDATE
      AppController.actualizarAviso(data.id, data);
    } else {
      // CREATE
      AppController.crearAviso(data);
    }
    setAvisos(AppController.getAvisos()); // Refrescar lista
    setModalVisible(false);
    setEditingAviso(null);
    Alert.alert('Éxito', data.id ? 'Aviso actualizado.' : 'Nuevo aviso creado.');
  };

  // Eliminar
  const handleDelete = (id) => {
    Alert.alert(
      "Confirmar Eliminación",
      "¿Estás seguro de que quieres eliminar este aviso?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          style: "destructive", 
          onPress: () => {
            AppController.eliminarAviso(id);
            setAvisos(AppController.getAvisos()); // Refrescar lista
            Alert.alert('Éxito', 'Aviso eliminado correctamente.');
          }
        }
      ]
    );
  };

  return (
    <View style={CommonStyles.container}>
      <Text style={CommonStyles.title}>Avisos del Condominio</Text>
      <Text style={CommonStyles.subtitle}>Publicaciones importantes para la comunidad.</Text>

      {/* Simulación de Filtros (según 7. Lista de Avisos.pdf) */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterChipActive}>Todos</Text>
        <Text style={styles.filterChip}>Mantenimiento</Text>
        <Text style={styles.filterChip}>Eventos</Text>
        <Text style={styles.filterChip}>Seguridad</Text>
      </View>

      {/* Lista de Avisos (READ) */}
      <FlatList
        data={avisos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AvisoItem 
            aviso={item} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        )}
      />

      {/* Botón simulación de Agregar nuevo aviso (CREATE) - Solo visible para Admin */}
      <TouchableOpacity 
        style={[CommonStyles.buttonPrimary, { marginTop: 20, marginBottom: 30 }]} 
        onPress={handleCreate}
      >
        <Text style={CommonStyles.buttonText}><Icon name="plus" size={18} /> Publicar Nuevo Aviso</Text>
      </TouchableOpacity>
      
      {/* Modal de Edición/Creación */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <AvisoForm 
          aviso={editingAviso} 
          onSave={handleSave} 
          onClose={() => setModalVisible(false)}
        />
      </Modal>
    </View>
  );
};

// --- Componente para el Formulario de Aviso ---
const AvisoForm = ({ aviso, onSave, onClose }) => {
  const [data, setData] = useState(aviso);

  const handleSubmit = () => {
    if (!data.titulo || !data.contenido) {
      Alert.alert("Error", "El título y el contenido son obligatorios.");
      return;
    }
    onSave(data);
  };

  return (
    <View style={styles.centeredView}>
      <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{aviso.id ? 'Editar Aviso' : 'Crear Nuevo Aviso'}</Text>
          
          <Text style={styles.label}>Título</Text>
          <TextInput
            style={styles.input}
            value={data.titulo}
            onChangeText={(text) => setData({ ...data, titulo: text })}
            placeholder="Título del aviso"
          />

          <Text style={styles.label}>Contenido</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={data.contenido}
            onChangeText={(text) => setData({ ...data, contenido: text })}
            placeholder="Detalle completo del aviso..."
            multiline
            numberOfLines={4}
          />
          
          <Text style={styles.label}>Categoría (Simulación)</Text>
          <TextInput
            style={styles.input}
            value={data.categoria}
            onChangeText={(text) => setData({ ...data, categoria: text })}
            placeholder="Mantenimiento, Eventos, Seguridad..."
          />
          
          <Text style={styles.label}>Prioridad (Simulación)</Text>
          <TextInput
            style={styles.input}
            value={data.prioridad}
            onChangeText={(text) => setData({ ...data, prioridad: text })}
            placeholder="Urgente, Normal, Baja..."
          />

          <TouchableOpacity style={CommonStyles.buttonPrimary} onPress={handleSubmit}>
            <Text style={CommonStyles.buttonText}>Guardar Aviso</Text>
          </TouchableOpacity>
          
          <Pressable style={[styles.buttonClose]} onPress={onClose}>
            <Text style={styles.textStyle}>Cerrar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 10,
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
  avisoCard: {
    ...CommonStyles.card,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
    position: 'relative',
    height: 120, // Altura fija para la vista previa
  },
  avisoInfo: {
    flex: 1,
    paddingRight: 110, // Espacio para los botones
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
  // --- Estilos del Modal ---
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
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
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: Colors.primary,
  },
  label: {
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 5,
    marginTop: 10,
    fontWeight: '500',
  },
  input: {
    borderColor: '#E2E8F0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    color: '#2D3748',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonClose: {
    marginTop: 15,
    backgroundColor: '#DC354510',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  textStyle: {
    color: Colors.danger,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AvisosScreen;