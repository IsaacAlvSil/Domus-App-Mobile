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

const PerfilScreen = () => {
  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [tempUser, setTempUser] = useState(user);

  // Guardar Cambios (UPDATE)
  const handleSave = () => {
    // Aquí se llamaría al controlador para actualizar la BD: AppController.updateUser(tempUser);
    setUser(tempUser);
    setIsEditing(false);
    Alert.alert('Éxito', 'Perfil actualizado correctamente (Simulación de UPDATE).');
  };

  // Cancelar Edición
  const handleCancel = () => {
    setTempUser(user); // Descartar cambios
    setIsEditing(false);
  };

  // Cerrar Sesión (DELETE - Sesión)
  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar la sesión? (Simulación de DELETE de Sesión)',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Cerrar Sesión', onPress: () => Alert.alert('Sesión Cerrada', '¡Vuelve pronto!'), style: 'destructive' },
      ],
      { cancelable: false },
    );
  };

  const renderField = (label, value, key) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {isEditing ? (
        <TextInput
          style={styles.fieldInput}
          value={tempUser[key]}
          onChangeText={(text) => setTempUser({ ...tempUser, [key]: text })}
        />
      ) : (
        <Text style={styles.fieldValue}>{value}</Text>
      )}
    </View>
  );

  return (
    <ScrollView style={CommonStyles.container}>
      <Text style={CommonStyles.header}>Mi Perfil</Text>

      {/* Foto de Perfil */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarPlaceholder}><Icon name="account" size={60} color="#FFF" /></View>
        <Text style={styles.userName}>{user.nombreCompleto.split(' ')[0]} {user.nombreCompleto.split(' ')[2]}</Text>
        <Text style={styles.userRole}>Residente</Text>
      </View>

      {/* Información Personal */}
      <View style={CommonStyles.card}>
        <Text style={CommonStyles.title}>Información Personal</Text>
        {renderField('Nombre completo', user.nombreCompleto, 'nombreCompleto')}
        {renderField('Departamento', user.departamento, 'departamento')}
        {renderField('Correo electrónico', user.correo, 'correo')}
        {renderField('Teléfono', user.telefono, 'telefono')}
      </View>

      {/* Notificaciones */}
      <View style={CommonStyles.card}>
        <Text style={CommonStyles.title}>Notificaciones</Text>
        <NotificationToggle 
            label="Notificaciones push" 
            isEnabled={tempUser.pushEnabled}
            isEditing={isEditing}
            onToggle={(value) => setTempUser({ ...tempUser, pushEnabled: value })}
        />
        <NotificationToggle 
            label="Notificaciones por email" 
            isEnabled={tempUser.emailEnabled}
            isEditing={isEditing}
            onToggle={(value) => setTempUser({ ...tempUser, emailEnabled: value })}
        />
      </View>

      {/* Botones de Acción */}
      {!isEditing ? (
        <TouchableOpacity style={[CommonStyles.buttonPrimary, styles.actionButton]} onPress={() => setIsEditing(true)}>
          <Text style={CommonStyles.buttonText}><Icon name="pencil" size={18} /> Editar Perfil</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.editButtonsContainer}>
          <TouchableOpacity 
            style={[CommonStyles.buttonPrimary, styles.editButton, { backgroundColor: '#AAA' }]} 
            onPress={handleCancel}
          >
            <Text style={CommonStyles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[CommonStyles.buttonPrimary, styles.editButton]} 
            onPress={handleSave}
          >
            <Text style={CommonStyles.buttonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Cerrar Sesión */}
      <TouchableOpacity style={[styles.logoutButton, styles.actionButton]} onPress={handleLogout}>
        <Text style={styles.logoutText}><Icon name="logout" size={18} color={Colors.danger} /> Cerrar Sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const NotificationToggle = ({ label, isEnabled, isEditing, onToggle }) => (
    <View style={styles.toggleContainer}>
        <Text style={styles.toggleLabel}>{label}</Text>
        <Switch
            trackColor={{ false: "#767577", true: Colors.primary }}
            thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
            onValueChange={onToggle}
            value={isEnabled}
            disabled={!isEditing}
        />
    </View>
);

const styles = StyleSheet.create({
  profileHeader: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  actionButton: {
    marginTop: 20,
    padding: 15,
  },
  editButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  editButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: 15,
  },
  logoutButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: Colors.danger,
    marginBottom: 50,
  },
  logoutText: {
    color: Colors.danger,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PerfilScreen;