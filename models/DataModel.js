// src/models/DataModel.js
// Modelo: Simula la Base de Datos y contiene la lógica CRUD

class DataModel {
  // Simulación de la base de datos (datos iniciales basados en los PDFs)
  constructor() {
    this.avisos = [
      { id: '1', titulo: 'Mantenimiento de Elevadores', categoria: 'Mantenimiento', fecha: '15 de Enero, 2025', prioridad: 'Urgente', contenido: 'Se realizará mantenimiento preventivo en todos los elevadores del edificio. Servicio interrumpido de 9:00 AM a 2:00 PM.', autor: 'Administración' },
      { id: '2', titulo: 'Asamblea General de Propietarios', categoria: 'Eventos', fecha: '20 de Enero, 2025', prioridad: 'Normal', contenido: 'Convocatoria a asamblea general para discutir mejoras en áreas comunes. Salón de eventos, 6:00 PM.', autor: 'Junta Directiva' },
      { id: '3', titulo: 'Actualización de Seguridad', categoria: 'Seguridad', fecha: '12 de Enero, 2025', prioridad: 'Normal', contenido: 'Nuevo sistema de cámaras de seguridad instalado en áreas comunes. Mayor cobertura y calidad de imagen.', autor: 'Seguridad' },
    ];
    this.pagos = [
      { id: 'p1', mes: 'Enero 2024', fecha: '15 Ene 2024', monto: 1250.00, estado: 'Pagado' },
      { id: 'p2', mes: 'Febrero 2024', fecha: '15 Feb 2024', monto: 1250.00, estado: 'Pagado' },
      { id: 'p3', mes: 'Marzo 2024', fecha: '15 Mar 2024', monto: 1250.00, estado: 'Pagado' },
      { id: 'p4', mes: 'Abril 2024', fecha: '15 Abr 2024', monto: 1250.00, estado: 'Pendiente' },
    ];
    this.amenidades = [
      { id: 'a1', nombre: 'Alberca', horario: '6:00 AM - 10:00 PM', estado: 'Disponible' },
      { id: 'a2', nombre: 'Gimnasio', horario: '5:00 AM - 11:00 PM', estado: 'Disponible' },
      { id: 'a3', nombre: 'Salón de Eventos', horario: '8:00 AM - 12:00 AM', estado: 'Ocupado' },
    ];
  }

  // --- MÉTODOS CRUD PARA AVISOS ---

  // Read: Obtener todos los avisos
  getAvisos() {
    return this.avisos;
  }

  // Create: Agregar un nuevo aviso
  addAviso(newAviso) {
    const id = (this.avisos.length + 1).toString();
    const avisoConId = { id, ...newAviso };
    this.avisos.push(avisoConId);
    return avisoConId;
  }

  // Update: Actualizar un aviso
  updateAviso(id, updatedData) {
    const index = this.avisos.findIndex(a => a.id === id);
    if (index !== -1) {
      this.avisos[index] = { ...this.avisos[index], ...updatedData };
      return this.avisos[index];
    }
    return null; // Aviso no encontrado
  }

  // Delete: Eliminar un aviso
  deleteAviso(id) {
    const initialLength = this.avisos.length;
    this.avisos = this.avisos.filter(a => a.id !== id);
    return this.avisos.length < initialLength; // Retorna true si se eliminó
  }

  // --- MÉTODOS CRUD PARA PAGOS (Simplificado, solo lectura) ---

  getPagos() {
    return this.pagos;
  }

  // --- MÉTODOS CRUD PARA AMENIDADES ---

  getAmenidades() {
    return this.amenidades;
  }

  // Update: Simular Reserva (Actualizar estado de amenidad)
  toggleAmenidadStatus(id) {
    const amenidad = this.amenidades.find(a => a.id === id);
    if (amenidad) {
      amenidad.estado = amenidad.estado === 'Disponible' ? 'Ocupado' : 'Disponible';
      return amenidad;
    }
    return null;
  }
}

// Exportar una instancia única (Singleton) del Modelo
export default new DataModel();