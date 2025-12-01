import * as SQLite from "expo-sqlite";
import { Platform } from "react-native";

class DatabaseService {
  constructor() {
    this.db = null;
  }

  async initialize() {
    if (Platform.OS !== "web") {
      this.db = await SQLite.openDatabaseAsync("miapp.db");

      await this.db.execAsync(`
        CREATE TABLE IF NOT EXISTS usuarios (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          fecha_creacion TEXT NOT NULL
        );
      `);

      await this.db.execAsync(`
        CREATE TABLE IF NOT EXISTS pagos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          monto REAL NOT NULL,
          estado TEXT NOT NULL,
          fecha_limite TEXT NOT NULL,
          concepto TEXT,
          periodo TEXT
        );
      `);

      const result = await this.db.getAllAsync("SELECT * FROM pagos");
      if (result.length === 0) {
        await this.db.runAsync(
          `INSERT INTO pagos (monto, estado, fecha_limite, concepto, periodo) 
           VALUES (?, ?, ?, ?, ?)`,
          1500.00, "Pendiente", "2025-01-30", "Cuota Mensual", "Enero 2025"
        );
      }
    }
  }

  async getAll() {
    if (Platform.OS === "web") return [];
    return await this.db.getAllAsync("SELECT * FROM usuarios ORDER BY id DESC");
  }
  async add(nombre) { /* ... tu código existente ... */ }
  async update(id, nombre) { /* ... tu código existente ... */ }
  async remove(id) { /* ... tu código existente ... */ }



  async getUltimoPago() {
    if (Platform.OS === "web") return null;
    const result = await this.db.getFirstAsync("SELECT * FROM pagos LIMIT 1");
    return result;
  }

  async pagarDeuda(id) {
    if (Platform.OS === "web") return;

    
    
    await this.db.runAsync(
      `UPDATE pagos SET monto = 0, estado = 'Pagado' WHERE id = ?`,
      id
    );
  }


async resetPago(id) {
  if (Platform.OS === "web") return;
  await this.db.runAsync(
    `UPDATE pagos SET monto = 1500, estado = 'Pendiente' WHERE id = ?`,
    id
  );
}


  async getHistorialPagos() {
    if (Platform.OS === "web") return [];
    return await this.db.getAllAsync("SELECT * FROM pagos ORDER BY fecha_limite DESC");
  }

  async crearPago(concepto, periodo, monto, estado, fecha) {
    if (Platform.OS === "web") return;
    await this.db.runAsync(
      `INSERT INTO pagos (concepto, periodo, monto, estado, fecha_limite) VALUES (?, ?, ?, ?, ?)`,
      concepto, periodo, monto, estado, fecha
    );
  }

  async actualizarPago(id, concepto, periodo, monto, estado, fecha) {
    if (Platform.OS === "web") return;
    await this.db.runAsync(
      `UPDATE pagos SET concepto = ?, periodo = ?, monto = ?, estado = ?, fecha_limite = ? WHERE id = ?`,
      concepto, periodo, monto, estado, fecha, id
    );
  }

  async eliminarPago(id) {
    if (Platform.OS === "web") return;
    await this.db.runAsync("DELETE FROM pagos WHERE id = ?", id);
  }
}

export default new DatabaseService();