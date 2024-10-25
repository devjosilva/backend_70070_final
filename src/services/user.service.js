// src/services/user.service.js
import UserDAO from '../dao/user.dao.js'; // Importamos el DAO de usuarios
import bcrypt from 'bcrypt';

class UserService {
    constructor() {
        this.userDAO = new UserDAO(); // Instanciamos el DAO
    }

    async getAllUsers() {
        return await this.userDAO.getAll(); // Recuperamos todos los usuarios a través del DAO
    }

    async getUserById(userId) {
        const user = await this.userDAO.findById(userId);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return user;
    }

    async createUser(userData) {
        const { email, password } = userData;

        // Verificamos si el usuario ya existe
        const existingUser = await this.userDAO.findByEmail(email);
        if (existingUser) {
            throw new Error('usuario exisytente');
        }

        // Hasheamos la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creamos el usuario
        const newUser = await this.userDAO.create({
            ...userData,
            password: hashedPassword,
        });

        return newUser;
    }

    async updateUser(userId, userData) {
        const user = await this.userDAO.update(userId, userData);
        if (!user) {
            throw new Error('Error al actualizar usuario');
        }
        return user;
    }

    async deleteUser(userId) {
        const user = await this.userDAO.delete(userId);
        if (!user) {
            throw new Error('Error al eliminar usuario');
        }
        return { message: 'Uso eliminado.' };
    }

    async changePassword(userId, newPassword) {
        // Hasheamos la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        // Actualizamos la contraseña usando el DAO
        const user = await this.userDAO.updatePassword(userId, hashedPassword);
        if (!user) {
            throw new Error('Error al actualizar contraseña');
        }

        return { message: 'Password actualizada' };
    }
}

export default UserService;
