// src/views/PerfilScreen.js
// VISTA: Implementa la funcionalidad CRUD (enfocada en READ y UPDATE/Edición de Perfil) para el Usuario
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Switch, Alert } from 'react-native';
import { CommonStyles, Colors } from '../styles/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Simulación de datos de usuario (READ)
const initialUser = {
  nombreCompleto: 'María Fernanda González López',
  departamento: 'Recursos Humanos',
  correo: 'maria.gonzalez@empresa.com',
  telefono: '+52 55 1234 5678',
  pushEnabled: true,
  emailEnabled: false,
};

// Componente para mostrar un campo de información
const FieldDisplay = ({ label, value, isEditing, onChangeText, fieldKey }) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.fieldLabel}>{label}</Text>
    {isEditing ? (
      <TextInput
        style={styles.fieldInput}
        value={value}
        onChangeText={(text) => onChangeText(fieldKey, text)}
      />
    ) : (
      <Text style={styles.fieldValue}>{value}</Text>
    )}
  </View>
);

// Componente para manejar los toggles de notificación
const NotificationToggle = ({ label, value, onToggle }) => (
  <View style={styles.toggleContainer}>
    <View>
      <Text style={styles.toggleLabel}>{label}</Text>
      <Text style={styles.toggleSubLabel}>Recibir alertas en tiempo real</Text>
    </View>
    <Switch
      trackColor={{ false: "#EAEAEA", true: Colors.primaryLight }}
      thumbColor={value ? Colors.primary : "#f4f3f4"}
      onValueChange={onToggle}
      value={value}
    />
  </View>
);


const PerfilScreen = () => {
  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [tempUser, setTempUser] = useState(user);

  // Manejar cambios en el formulario temporal (UPDATE)
  const handleChange = (key, value) => {
    setTempUser(prev => ({ ...prev, [key]: value }));
  };

  // Guardar Cambios (UPDATE)
  const handleSave = () => {
    // Aquí se llamaría al controlador para actualizar la BD: AppController.updateUser(tempUser);
    setUser(tempUser);
    setIsEditing(false);
    Alert.alert('Éxito', 'Perfil actualizado correctamente (Simulación de UPDATE).');
  };

  // Cancelar Edición
  const handleCancel = () => {
    setTempUser(user);
    setIsEditing(false);
  };

  return (
    <ScrollView style={CommonStyles.container}>
      <View style={styles.header}>
        <Icon name="account-circle" size={80} color={Colors.primary} />
        <Text style={styles.userName}>María González</Text>
        <Text style={styles.userRole}>Residente</Text>
      </View>

      {/* Tarjeta de Información Personal (READ/UPDATE) */}
      <View style={CommonStyles.card}>
        <Text style={CommonStyles.title}>Información Personal</Text>
        <FieldDisplay
          label="Nombre completo"
          value={tempUser.nombreCompleto}
          isEditing={isEditing}
          onChangeText={handleChange}
          fieldKey="nombreCompleto"
        />
        <FieldDisplay
          label="Departamento"
          value={tempUser.departamento}
          isEditing={isEditing}
          onChangeText={handleChange}
          fieldKey="departamento"
        />
        <FieldDisplay
          label="Correo electrónico"
          value={tempUser.correo}
          isEditing={isEditing}
          onChangeText={handleChange}
          fieldKey="correo"
        />
        <FieldDisplay
          label="Teléfono"
          value={tempUser.telefono}
          isEditing={isEditing}
          onChangeText={handleChange}
          fieldKey="telefono"
        />
      </View>

      {/* Tarjeta de Notificaciones (UPDATE) */}
      <View style={CommonStyles.card}>
        <Text style={CommonStyles.title}>Notificaciones</Text>
        <NotificationToggle
          label="Notificaciones push"
          value={tempUser.pushEnabled}
          onToggle={() => handleChange('pushEnabled', !tempUser.pushEnabled)}
        />
        <NotificationToggle
          label="Notificaciones por email"
          value={tempUser.emailEnabled}
          onToggle={() => handleChange('emailEnabled', !tempUser.emailEnabled)}
        />
      </View>

      {/* Tarjeta de Métodos de Pago */}
      <View style={CommonStyles.card}>
        <Text style={CommonStyles.title}>Métodos de Pago</Text>
        <Text style={CommonStyles.subtitle}>Próximamente disponible</Text>
      </View>

      {/* Botones de Acción (Editar/Guardar/Cancelar) */}
      <View style={{ marginBottom: 40, marginTop: 10 }}>
        {isEditing ? (
          <View>
            <TouchableOpacity style={CommonStyles.buttonPrimary} onPress={handleSave}>
              <Text style={CommonStyles.buttonText}><Icon name="content-save-outline" size={18} /> Guardar Cambios</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[CommonStyles.buttonPrimary, { backgroundColor: Colors.danger, marginTop: 10 }]} onPress={handleCancel}>
              <Text style={CommonStyles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={CommonStyles.buttonPrimary} onPress={() => setIsEditing(true)}>
            <Text style={CommonStyles.buttonText}><Icon name="pencil" size={18} /> Editar Perfil</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={[styles.actionButton, { marginTop: 20 }]} onPress={() => Alert.alert('Cerrar Sesión', 'Se cerrará la sesión de la aplicación.')}>
          <Text style={styles.actionButtonText}><Icon name="logout" size={18} color={Colors.danger} /> Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    color: Colors.text,
  },
  userRole: {
    fontSize: 14,
    color: 'gray',
  },
  fieldContainer: {
    marginTop: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  fieldLabel: {
    fontSize: 12,
    color: 'gray',
  },
  fieldValue: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    marginTop: 2,
  },
  fieldInput: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    marginTop: 2,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
    paddingHorizontal: 0,
    paddingBottom: 2,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  toggleLabel: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
  },
  toggleSubLabel: {
    fontSize: 12,
    color: 'gray',
  },
  actionButton: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    color: Colors.danger,
    fontWeight: '600',
  }
});

export default PerfilScreen;