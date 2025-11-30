// src/controllers/AppController.js
// Controlador: Conecta las Vistas con el Modelo (DataModel)
import DataModel from '../models/DataModel';

class AppController {
  // --- AVISOS CRUD ---

  getAvisos() {
    // Retorna los avisos en orden inverso para que los más nuevos aparezcan primero
    return DataModel.getAvisos().reverse();
  }

  crearAviso(avisoData) {
    // Simula la adición y retorna el nuevo aviso con ID
    return DataModel.addAviso(avisoData);
  }

  actualizarAviso(id, avisoData) {
    return DataModel.updateAviso(id, avisoData);
  }

  eliminarAviso(id) {
    return DataModel.deleteAviso(id);
  }

  // --- PAGOS (Solo lectura/lista) ---

  getPagos() {
    return DataModel.getPagos();
  }

  // --- AMENIDADES CRUD (Reservas) ---

  getAmenidades() {
    return DataModel.getAmenidades();
  }

  // Simula la acción de reservar/cancelar
  toggleReservaAmenidad(id) {
    return DataModel.toggleAmenidadStatus(id);
  }
}

export default new AppController();