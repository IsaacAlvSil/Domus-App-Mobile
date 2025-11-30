// src/controllers/AppController.js
// Controlador: Conecta las Vistas con el Modelo (DataModel)
import DataModel from '../models/DataModel';

class AppController {
  // --- AVISOS CRUD ---

  getAvisos() {
    return DataModel.getAvisos();
  }

  crearAviso(avisoData) {
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

  toggleReservaAmenidad(id) {
    return DataModel.toggleAmenidadStatus(id);
  }
}

export default new AppController();