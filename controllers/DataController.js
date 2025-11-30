import Notice from '../models/Notice';
import Payment from '../models/Payment';

class DataController {
  // Datos para Dashboard y Avisos
  static getNotices() {
    return [
      new Notice('1', 'Mantenimiento de Elevadores', '15 Enero, 2025', 'Urgente', 'Mantenimiento', 
        'Se realizará mantenimiento preventivo en todos los elevadores...', 'Servicio interrumpido de 9:00 AM a 2:00 PM.'),
      new Notice('2', 'Asamblea General', '20 Enero, 2025', 'Evento', 'Eventos', 
        'Convocatoria a asamblea general para discutir mejoras...', 'Salón de eventos, 6:00 PM.'),
      new Notice('3', 'Actualización de Seguridad', '12 Enero, 2025', 'Seguridad', 'Seguridad', 
        'Nuevo sistema de cámaras de seguridad instalado...', 'Mayor cobertura y calidad de imagen.'),
    ];
  }

  // Datos para Pagos
  static getPendingPayment() {
    return { amount: 450.00, currency: 'USD', dueDate: '15 Enero, 2025', status: 'Pendiente' };
  }

  static getPaymentHistory() {
    return [
      new Payment('1', 'Enero 2024', 1250.00, 'Pagado', '15 Ene 2024'),
      new Payment('2', 'Febrero 2024', 1250.00, 'Pagado', '15 Feb 2024'),
      new Payment('3', 'Marzo 2024', 1250.00, 'Pagado', '15 Mar 2024'),
      new Payment('4', 'Abril 2024', 1250.00, 'Pendiente', null),
    ];
  }

  // Datos para Servicios
  static getServices() {
    return [
      { id: '1', name: 'Carlos Mendoza', service: 'Plomería y Gasistería', rating: 5.0, reviews: 24, available: 'Hoy' },
      { id: '2', name: 'María González', service: 'Limpieza Profunda', rating: 4.8, reviews: 18, available: 'Mañana' },
      { id: '3', name: 'Jardines Verdes', service: 'Jardinería', rating: 4.9, reviews: 31, available: 'Esta semana' },
    ];
  }
  
  // Datos para Amenidades
  static getAmenities() {
    return [
      { id: '1', name: 'Alberca', hours: '6:00 AM - 10:00 PM', status: 'Disponible' },
      { id: '2', name: 'Gimnasio', hours: '5:00 AM - 11:00 PM', status: 'Disponible' },
      { id: '3', name: 'Salón de Eventos', hours: '8:00 AM - 12:00 AM', status: 'Ocupado' },
    ];
  }
}

export default DataController;