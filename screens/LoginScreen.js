import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aquí iría tu lógica de autenticación (Firebase/API)
    navigation.replace('HomeApp'); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.content}>
        <View style={styles.header}>
          {/* Aquí iría tu <Image /> del logo */}
          <Text style={styles.appName}>Domus App</Text>
          <Text style={styles.appDesc}>Administración de Condominios</Text>
        </View>

        <View style={styles.form}>
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
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.btnPrimary} onPress={handleLogin}>
            <Text style={styles.btnText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.registerText}>¿No tienes cuenta? <Text style={{fontWeight:'bold'}}>Registrarse</Text></Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, padding: 24, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 40 },
  appName: { fontSize: 32, fontWeight: 'bold', color: '#2c3e50', marginBottom: 5 },
  appDesc: { fontSize: 16, color: '#7f8c8d' },
  form: { width: '100%' },
  label: { fontSize: 14, fontWeight: '600', color: '#34495e', marginBottom: 8 },
  input: { backgroundColor: '#f5f6fa', borderRadius: 12, padding: 16, marginBottom: 20, fontSize: 16, borderWidth: 1, borderColor: '#eef2f7' },
  btnPrimary: { backgroundColor: '#2ecc71', borderRadius: 12, paddingVertical: 18, alignItems: 'center', marginBottom: 20, shadowColor: "#2ecc71", shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.3, shadowRadius: 4.65, elevation: 8 },
  btnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  linkButton: { alignItems: 'center', marginTop: 10 },
  linkText: { color: '#2ecc71', fontSize: 14 },
  registerText: { color: '#7f8c8d', fontSize: 14 },
});

export default LoginScreen;