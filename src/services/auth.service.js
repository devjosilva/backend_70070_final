// src/services/auth.service.js
import UserDAO from '../dao/user.dao.js'; // Importamos el DAO de usuarios
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AuthService {
    constructor() {
        this.userDAO = new UserDAO(); // Instanciamos el DAO
    }

    async register(userData) {
        const { email, password } = userData;

        // Verificamos si el usuario ya existe
        const existingUser = await this.userDAO.findByEmail(email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        // Hasheamos la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Guardamos el nuevo usuario
        const newUser = await this.userDAO.create({
            ...userData,
            password: hashedPassword,
        });

        return newUser;
    }

    async login(email, password) {
        // Buscamos el usuario por email
        const user = await this.userDAO.findByEmail(email);
        if (!user) {
            throw new Error('Usuario o contraseña incorrectos');
        }

        // Verificamos la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Usuario o contraseña incorrectos');
        }

        // Generamos un token JWT
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        return { token, user };
    }

    async restorePassword(email, newPassword) {
        // Buscamos el usuario por email
        const user = await this.userDAO.findByEmail(email);
        if (!user) {
            throw new Error('Usuario incorrecto');
        }

        // Hasheamos la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Actualizamos la contraseña en la base de datos
        await this.userDAO.updatePassword(user._id, hashedPassword);

        return { message: 'Password actualizada correctamente.' };
    }
}

export default AuthService;
