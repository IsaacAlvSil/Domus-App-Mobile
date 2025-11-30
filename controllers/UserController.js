import { UserModel } from '../models/UserModel';

export class UserController {
  static async login(email, password) {
    try {
      const user = await UserModel.getUserByEmail(email);
      if (user) {
        return { success: true, user };
      }
      return { success: false, error: 'Usuario no encontrado' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async updateProfile(userId, profileData) {
    try {
      await UserModel.updateUserProfile(userId, profileData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}