import { PaymentModel } from '../models/PaymentModel';

export class PaymentController {
  static async getPayments(userId) {
    try {
      const payments = await PaymentModel.getUserPayments(userId);
      return { success: true, payments };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async makePayment(paymentData) {
    try {
      await PaymentModel.createPayment(paymentData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}