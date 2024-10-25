import express from 'express';
import { register, login, logout, restorePassword, githubAuth, githubCallback } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/auth.js'; // Importa el middleware de autenticación si es necesario

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', register);

// Ruta para iniciar sesión
router.post('/login', login);

// Ruta para cerrar sesión
router.get('/logout', logout);

// Ruta para restaurar contraseña
router.post('/restore-password', restorePassword);

// Rutas para autenticación con GitHub
router.get('/github', githubAuth);
router.get('/github/callback', githubCallback);

// Middleware para proteger rutas, si es necesario
// router.use(authMiddleware);

export default router;
