// config/database.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Carga las variables de entorno desde el archivo .env
dotenv.config({ path: path.resolve('.env') });

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/integrative_practice';

// Función para conectar a la base de datos
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexión a la base de datos MongoDB exitosa');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
    process.exit(1); // Finaliza el proceso si no se puede conectar
  }
};

export default connectDB;
