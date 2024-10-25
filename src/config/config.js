import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';


// Carga las variables de entorno desde el archivo .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Especifica la ruta del archivo .env
// Carga variables de entorno
dotenv.config({ path: path.resolve(__dirname, '../.env') });

//dotenv.config({ path: path.resolve('.env') });

// Definición de configuraciones generales del proyecto
const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
  cookieSecret: process.env.COOKIE_SECRET || 'your_cookie_secret',
  jwtExpiration: process.env.JWT_EXPIRATION || '1h', // Configuración del tiempo de vida del JWT
  environment:process.env.NODE_ENV || 'developer'
};

export default config;
