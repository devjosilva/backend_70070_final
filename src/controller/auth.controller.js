// auth.controller.js

import User from '../models/user.model.js'; // Asegúrate de tener tu modelo de usuario importado
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Registrar un nuevo usuario
export const register = async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ first_name, last_name, email, age, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
};

// Iniciar sesión
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ error: 'Credenciales incorrectas' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};

// Cerrar sesión
export const logout = (req, res) => {
    req.logout(err => {
        if (err) {
            return res.status(500).json({ error: 'Error al cerrar sesión' });
        }
        res.status(200).json({ message: 'Sesión cerrada' });
    });
};

// Restaurar contraseña (ejemplo simple)
export const restorePassword = (req, res) => {
    // Implementa tu lógica para restaurar la contraseña
    res.status(200).json({ message: 'Solicitud de restauración de contraseña recibida' });
};

// Autenticación con GitHub
export const githubAuth = (req, res) => {
    // Implementa la lógica para autenticar con GitHub
};

// Callback de autenticación con GitHub
export const githubCallback = (req, res) => {
    // Implementa la lógica para manejar el callback de GitHub
    res.redirect('/');
};
