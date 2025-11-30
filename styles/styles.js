// src/styles/styles.js
// Estilos comunes para toda la app
import { StyleSheet } from 'react-native';

const Colors = {
  primary: '#6A5ACD', // Morado/Azul principal
  secondary: '#FFD700', // Dorado para resaltado (ej. Pendiente)
  background: '#F5F5F5',
  card: '#FFFFFF',
  text: '#333333',
  danger: '#DC3545',
  success: '#28A745',
  pendiente: '#FFC107',
  pagado: '#28A745',
  urgente: '#DC3545',
};

const CommonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 20,
    paddingTop: 40,
    paddingHorizontal: 10,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
  },
  buttonPrimary: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: Colors.card,
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCC',
    marginBottom: 10,
    fontSize: 16,
  },
});

export { CommonStyles, Colors };    