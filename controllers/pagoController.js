import Pago from "../models/Pago";
import DatabaseService from "../database/DatabaseService";



export default class PagoController {
  constructor() {
    this.listeners = [];
  }

  async initialize() {
    await DatabaseService.initialize();
  }

  async obtenerPagoActual() {
    const data = await DatabaseService.getUltimoPago();
    if (!data) return null;
    
    return new Pago(
      data.id, 
      data.monto, 
      data.estado, 
      data.fecha_limite,
      data.concepto,
      data.periodo
    );
  }


async restablecerDeuda(id) {
  await DatabaseService.resetPago(id);
  this.notifyListeners();
}

  async realizarPago(id) {
    await DatabaseService.pagarDeuda(id);

    this.notifyListeners();
  }

  addListener(listener) {
    this.listeners.push(listener);
  }

  removeListener(listener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  notifyListeners() {
    this.listeners.forEach((l) => l());
  }


  async obtenerHistorialCompleto() {
    const rawData = await DatabaseService.getHistorialPagos();
    return rawData;
  }

  async guardarNuevoPago(datos) {
    await DatabaseService.crearPago(
      datos.concepto, 
      datos.periodo, 
      parseFloat(datos.monto), 
      datos.estado, 
      datos.fecha_limite
    );
    this.notifyListeners();
  }

  async editarPagoExistente(id, datos) {
    await DatabaseService.actualizarPago(
      id,
      datos.concepto, 
      datos.periodo, 
      parseFloat(datos.monto), 
      datos.estado, 
      datos.fecha_limite
    );
    this.notifyListeners();
  }

  async borrarPago(id) {
    await DatabaseService.eliminarPago(id);
    this.notifyListeners();
  }
}