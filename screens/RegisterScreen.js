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
import { CommonStyles, Colors } from '../styles/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Simulamos la imagen del logo (misma que en LoginScreen)
const logo = 'https://placehold.co/100x100/6A5ACD/ffffff?text=Domus';

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
      
      // Aquí se enviaría la información al backend para crear el usuario
      Alert.alert('Registro Exitoso', 'Tu cuenta ha sido creada. Por favor, inicia sesión.');
      
      // Simula el éxito y navega a la pantalla de login
      if (onRegisterSuccess) {
          onRegisterSuccess(); 
      } else {
          onNavigateToLogin();
      }
    }, 1500); // Retraso de 1.5 segundos para simular la carga
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: logo }} style={styles.logo} />
        <Text style={styles.appName}>Domus App</Text>
        <Text style={styles.appSubtitle}>Registro de Condominios</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.title}>Registrarse</Text>

        <Text style={styles.label}>Nombre Completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Ana María López"
          value={fullName}
          onChangeText={setFullName}
          autoCapitalize="words"
        />

        <Text style={styles.label}>Número de Unidad/Departamento</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: A-201"
          value={unitNumber}
          onChangeText={setUnitNumber}
          autoCapitalize="characters"
        />

        <Text style={styles.label}>Correo Electrónico</Text>
        <TextInput
          style={styles.input}
          placeholder="tu@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Mínimo 6 caracteres"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <Text style={styles.label}>Confirmar Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Repite tu contraseña"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity 
          style={styles.registerButton(loading)} 
          onPress={handleRegister} 
          disabled={loading}
        >
          <Text style={CommonStyles.buttonText}>
            {loading ? 'Registrando...' : 'Registrarse'}
          </Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>¿Ya tienes cuenta?</Text>
          <TouchableOpacity onPress={onNavigateToLogin}>
            <Text style={styles.linkText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: CommonStyles.container.backgroundColor,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 15,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
    marginTop: 8,
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
    backgroundColor: loading ? '#A0AEC0' : Colors.primary, // Morado primario
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  }),
  linkText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  loginText: {
    fontSize: 14,
    color: '#4A5568',
    marginRight: 5,
  }
});

export default RegisterScreen;