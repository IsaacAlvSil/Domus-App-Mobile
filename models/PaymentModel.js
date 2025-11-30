export class PaymentModel {
  static async getUserPayments(userId) {
    const query = 'SELECT * FROM payments WHERE user_id = ? ORDER BY due_date DESC';
    const result = await executeQuery(query, [userId]);
    return result.rows._array;
  }

  static async createPayment(paymentData) {
    const query = `INSERT INTO payments (user_id, amount, due_date, period, status) 
                   VALUES (?, ?, ?, ?, ?)`;
    await executeQuery(query, [
      paymentData.user_id,
      paymentData.amount,
      paymentData.due_date,
      paymentData.period,
      paymentData.status
    ]);
  }
}