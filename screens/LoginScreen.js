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

// Simulamos la imagen del logo
const logo = 'https://placehold.co/100x100/007bff/ffffff?text=Domus';

// Componente principal de la pantalla de inicio de sesión
// Aceptamos props para manejar la lógica de navegación real fuera del componente
const LoginScreen = ({ onLoginSuccess, onNavigateToRegister, onForgotPassword }) => {
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
        // En lugar de Alert y console.log, llamamos al prop de éxito de navegación
        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          // Fallback solo para desarrollo si el prop no se pasa
          Alert.alert('Éxito', '¡Inicio de sesión exitoso! (Falta prop onLoginSuccess)');
        }
      } else {
        Alert.alert('Error', 'Credenciales inválidas. Inténtalo de nuevo.');
      }
    }, 2000); // 2 segundos de simulación de carga
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
          placeholder="...."
          placeholderTextColor="#A0AEC0"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          editable={!loading}
        />

        {/* Botón Iniciar Sesión */}
        <TouchableOpacity
          style={styles.loginButton(loading)}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.loginButtonText}>
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </Text>
        </TouchableOpacity>

        {/* Enlace ¿Olvidaste tu contraseña? */}
        <TouchableOpacity style={styles.linkButton} onPress={onForgotPassword}>
          <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        {/* Enlaces ¿No tienes cuenta? Registrarse */}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>¿No tienes cuenta?</Text>
          <TouchableOpacity style={styles.linkButton} onPress={onNavigateToRegister}>
            <Text style={styles.linkText}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

// Estilos utilizando la convención de React Native
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F7FAFC', // Fondo claro
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginBottom: 10,
  },
  appName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2D3748',
  },
  appSubtitle: {
    fontSize: 16,
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
    backgroundColor: loading ? '#63B3ED' : '#007AFF', // Azul primario
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    opacity: loading ? 0.7 : 1,
  }),
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  linkButton: {
    alignSelf: 'center',
    paddingVertical: 5,
  },
  linkText: {
    color: '#007AFF',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  registerText: {
    color: '#4A5568',
    fontSize: 14,
    marginRight: 5,
  },
});

export default LoginScreen;