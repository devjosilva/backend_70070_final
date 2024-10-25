// src/dao/user.dao.js
import User from '../models/user.model.js';

class UserDAO {
    async getAll() {
        return await User.find(); // Recupera todos los usuarios
    }

    async findById(userId) {
        return await User.findById(userId); // Encuentra un usuario por su ID
    }

    async findByEmail(email) {
        return await User.findOne({ email }); // Encuentra un usuario por su email
    }

    async create(userData) {
        return await User.create(userData); // Crea un nuevo usuario
    }

    async update(userId, userData) {
        return await User.findByIdAndUpdate(userId, userData, { new: true }); // Actualiza los datos del usuario
    }

    async delete(userId) {
        return await User.findByIdAndDelete(userId); // Elimina un usuario
    }

    async updatePassword(userId, hashedPassword) {
        return await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true }); // Actualiza la contraseña del usuario
    }
}

export default UserDAO;
