import * as SQLite from 'expo-sqlite';

let db;

export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    try {
      db = SQLite.openDatabase('domus.db', '1.0', 'Domus App Database', 1000000);
      
      db.transaction(tx => {
        // Tabla de usuarios
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            phone TEXT,
            department TEXT,
            push_notifications BOOLEAN DEFAULT 1,
            email_notifications BOOLEAN DEFAULT 1
          );`,
          [],
          () => console.log('✅ Tabla users creada'),
          (tx, error) => {
            console.log('❌ Error creando users:', error);
            return false;
          }
        );

        // Tabla de pagos
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS payments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            amount REAL NOT NULL,
            due_date TEXT NOT NULL,
            status TEXT DEFAULT 'pending',
            period TEXT NOT NULL,
            payment_date TEXT,
            FOREIGN KEY (user_id) REFERENCES users (id)
          );`,
          [],
          () => console.log('✅ Tabla payments creada'),
          (tx, error) => {
            console.log('❌ Error creando payments:', error);
            return false;
          }
        );

        // Insertar usuario de prueba
        tx.executeSql(
          `INSERT OR IGNORE INTO users (id, name, email, phone, department) VALUES (?, ?, ?, ?, ?)`,
          [1, 'Gael', 'gael@email.com', '+52 55 1234 5678', 'Residente'],
          () => console.log('✅ Usuario insertado'),
          (tx, error) => {
            console.log('❌ Error insertando usuario:', error);
            return false;
          }
        );

      }, (error) => {
        console.log('❌ Error en transacción:', error);
        reject(error);
      }, () => {
        console.log('✅ Base de datos inicializada completamente');
        resolve();
      });
      
    } catch (error) {
      console.log('❌ Error general en DB:', error);
      reject(error);
    }
  });
};

export const executeQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database not initialized'));
      return;
    }
    
    db.transaction(tx => {
      tx.executeSql(
        sql, 
        params, 
        (tx, results) => {
          resolve(results);
        }, 
        (error) => {
          console.log('❌ Error en query:', error);
          reject(error);
          return false;
        }
      );
    });
  });
};

export default db;