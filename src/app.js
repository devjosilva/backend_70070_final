// src/app.js

import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import handlebars from 'express-handlebars';
import config from './config/config.js';  // Importa configuraciones generales
import connectDB from './config/database.js';  // Importa la función de conexión a la base de datos
import userRoutes from './routes/userRoutes.js';  // Importa las rutas de usuarios
import authRoutes from './routes/authRoutes.js';  // Importa las rutas de autenticación
import { authMiddleware } from './middlewares/authMiddleware.js'; // Importa middleware de autenticación
// Inicializa la aplicación Express
const app = express();

// Configura el middleware para manejar JSON y cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(config.cookieSecret)); // Usar cookieSecret para firmar cookies

// Configuración de Handlebars
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.engine('handlebars', handlebars.engine({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true
    },
    helpers: {
        eq: (a, b) => a === b,  // Helper personalizado 'eq'
    }
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Conecta a la base de datos MongoDB
connectDB();

// Rutas públicas para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de la API
app.use('/api/users', userRoutes);  // Rutas para el CRUD de usuarios
app.use('/api/auth', authRoutes);   // Rutas para autenticación

// Rutas para vistas
app.get('/users/login', (req, res) => res.render('login')); // Ruta para vista de login
app.get('/users/current', authMiddleware, (req, res) => res.render('current', { user: req.user })); // Ruta para vista de usuario actual

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('¡Algo salió mal!');
});

// Inicia el servidor en el puerto especificado
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
