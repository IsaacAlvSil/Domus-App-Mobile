import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert
} from 'react-native';

// Simulamos la imagen del logo (misma que en LoginScreen)
const logo = 'https://placehold.co/100x100/007bff/ffffff?text=Domus';

// Componente principal de la pantalla de registro
const RegisterScreen = ({ onRegisterSuccess, onNavigateToLogin }) => {
  const [fullName, setFullName] = useState('');
  const [unitNumber, setUnitNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Función para manejar el registro de un nuevo usuario
  const handleRegister = () => {
    if (!fullName || !unitNumber || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);

    // Simulación de una llamada API de registro
    setTimeout(() => {
      setLoading(false);
      
      // En una app real, aquí se enviaría la solicitud de registro al backend
      console.log('Datos de Registro:', { fullName, unitNumber, email });

      // Simulación de éxito de registro
      Alert.alert('Éxito', '¡Registro enviado! Tu cuenta está pendiente de aprobación por la administración del condominio.');
      
      // Llamamos al prop de navegación para regresar al login
      if (onNavigateToLogin) {
        onNavigateToLogin();
      }

    }, 3000); // 3 segundos de simulación de carga
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: logo }} style={styles.logo} />
        <Text style={styles.appName}>Domus App</Text>
        <Text style={styles.appSubtitle}>Crear Cuenta de Residente</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.title}>Registrarse</Text>

        {/* Campo Nombre Completo */}
        <Text style={styles.label}>Nombre Completo</Text>
        <TextInput
          style={styles.input}
          placeholder="María González"
          placeholderTextColor="#A0AEC0"
          autoCapitalize="words"
          value={fullName}
          onChangeText={setFullName}
          editable={!loading}
        />
        
        {/* Campo Número de Unidad/Departamento */}
        <Text style={styles.label}>Número de Unidad/Departamento</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: A-101 o 503"
          placeholderTextColor="#A0AEC0"
          autoCapitalize="none"
          value={unitNumber}
          onChangeText={setUnitNumber}
          editable={!loading}
        />

        {/* Campo de Correo Electrónico */}
        <Text style={styles.label}>Correo Electrónico</Text>
        <TextInput
          style={styles.input}
          placeholder="tu@email.com"
          placeholderTextColor="#A0AEC0"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          editable={!loading}
        />

        {/* Campo de Contraseña */}
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Mínimo 8 caracteres"
          placeholderTextColor="#A0AEC0"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          editable={!loading}
        />
        
        {/* Campo de Confirmar Contraseña */}
        <Text style={styles.label}>Confirmar Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Repite la contraseña"
          placeholderTextColor="#A0AEC0"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          editable={!loading}
        />


        {/* Botón Registrarse */}
        <TouchableOpacity
          style={styles.registerButton(loading)}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.registerButtonText}>
            {loading ? 'Enviando Solicitud...' : 'Registrarme'}
          </Text>
        </TouchableOpacity>

        {/* Enlace ¿Ya tienes cuenta? Iniciar Sesión */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>¿Ya tienes cuenta?</Text>
          <TouchableOpacity style={styles.linkButton} onPress={onNavigateToLogin}>
            <Text style={styles.linkText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F7FAFC', // Fondo claro
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 16,
    marginBottom: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D3748',
  },
  appSubtitle: {
    fontSize: 14,
    color: '#4A5568',
    marginTop: 5,
  },
  form: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    height: 44,
    borderColor: '#E2E8F0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#2D3748',
    backgroundColor: '#F7FAFC',
  },
  registerButton: (loading) => ({
    backgroundColor: loading ? '#63B3ED' : '#007AFF', // Azul primario
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    opacity: loading ? 0.7 : 1,
  }),
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  linkButton: {
    paddingVertical: 5,
  },
  linkText: {
    color: '#007AFF',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginText: {
    color: '#4A5568',
    fontSize: 14,
    marginRight: 5,
  },
});

export default RegisterScreen;