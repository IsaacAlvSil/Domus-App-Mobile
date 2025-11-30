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

// Simulamos la imagen del logo
const logo = 'https://placehold.co/100x100/007bff/ffffff?text=Domus';

// Componente principal de la pantalla de inicio de sesión
// Ahora acepta 'onLoginSuccess' y 'navigation'
const LoginScreen = ({ navigation, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Función para manejar el inicio de sesión
  const handleLogin = () => {
    if (!email || !password) {
      // Usamos Alert para mensajes simples de validación local
      Alert.alert('Error', 'Por favor, ingresa tu correo electrónico y contraseña.');
      return;
    }

    setLoading(true);

    // Simulación de una llamada API de inicio de sesión
    setTimeout(() => {
      setLoading(false);
      
      // Aquí se validaría el inicio de sesión con el backend
      if (email === 'tu@email.com' && password === '1234') {
        // Llama a la función de App.js para cambiar el estado a autenticado
        onLoginSuccess(); 
      } else {
        Alert.alert('Error de Sesión', 'Credenciales incorrectas. Usa tu@email.com y 1234.');
      }
    }, 1500);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: logo }} style={styles.logo} />
        <Text style={styles.appName}>Domus App</Text>
        <Text style={styles.appSubtitle}>Administración de Condominios</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.title}>Iniciar Sesión</Text>

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
          placeholder="...."
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={() => Alert.alert('Recuperar Contraseña', 'Función de recuperación de contraseña en desarrollo.')}
        >
          <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton(loading)}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={CommonStyles.buttonText}>
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>¿No tienes cuenta?</Text>
        <TouchableOpacity
          style={styles.registerLink}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.registerLinkText}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: '#F7FAFC', // Fondo claro
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  appName: {
    fontSize: 28,
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
    fontSize: 24,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 25,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    height: 48,
    borderColor: '#E2E8F0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    color: '#2D3748',
    backgroundColor: '#F7FAFC',
  },
  loginButton: (loading) => ({
    backgroundColor: loading ? '#63B3ED' : Colors.primary, // Azul primario
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  }),
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  registerText: {
    color: '#4A5568',
    fontSize: 14,
  },
  registerLinkText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default LoginScreen;