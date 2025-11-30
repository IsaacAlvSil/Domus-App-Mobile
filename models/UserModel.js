export class UserModel {
  static async getUserByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = ?';
    const result = await executeQuery(query, [email]);
    return result.rows._array[0];
  }

  static async updateUserProfile(userId, updates) {
    const fields = Object.keys(updates);
    const values = Object.values(updates);
    const setClause = fields.map(field => `${field} = ?`).join(', ');
    
    const query = `UPDATE users SET ${setClause} WHERE id = ?`;
    await executeQuery(query, [...values, userId]);
  }
}