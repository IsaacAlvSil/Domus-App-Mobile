// src/styles/styles.js
// Define estilos y colores comunes para toda la aplicación

export const Colors = {
  primary: '#6A5ACD', // Morado principal, usado en botones, íconos activos
  secondary: '#FFD700', // Amarillo para alertas/pendientes
  card: '#FFFFFF',
  background: '#F8F9FA', // Fondo claro
  text: '#212529', // Texto oscuro
  success: '#28A745', // Verde para Pagado/Disponible
  danger: '#DC3545', // Rojo para Peligro/Eliminar/Ocupado
  pendiente: '#FFC107', // Amarillo para estado Pendiente
  pagado: '#28A745', // Verde para estado Pagado
};

export const CommonStyles = {
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 10,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonPrimary: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.card,
    fontSize: 16,
    fontWeight: 'bold',
  },
};