# Proyecto de Gestión de Usuarios con Node.js, Express, MongoDB y JWT

Este proyecto implementa un servidor backend usando Node.js, Express, y MongoDB, con un sistema de autenticación y autorización basado en JWT. Se utiliza la estrategia de autenticación de Passport, vistas con Handlebars y manejo de cookies para gestionar sesiones de usuario.

## 🛠️ Características

- **CRUD de Usuarios**: Gestión completa de usuarios con rutas específicas.
- **Autenticación y Autorización**: Manejo de login con JWT y protección de rutas.
- **Encriptación de Contraseñas**: Uso de bcrypt para hashear contraseñas.
- **Manejo de Cookies**: Uso de cookies firmadas para almacenar JWT.
- **Vistas con Handlebars**: Interfaz de usuario para login y visualización de datos básicos.
- **Separación de Arquitectura**: Proyecto estructurado con separación clara de controladores, modelos, rutas, y vistas.

## 🚀 Instalación y Configuración
Sigue los pasos a continuación para configurar y ejecutar el proyecto.

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
```

### 2.- Instalar Dependencias

Ejecuta el siguiente comando para instalar todas las dependencias necesarias:

npm install

### 3. Configuración del Proyecto
Crea un archivo .env en la raíz del proyecto con las siguientes variables:
PORT=3000  
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/integrative_practice  
JWT_SECRET=your_jwt_secret  
COOKIE_SECRET=your_cookie_secret  

Configura el archivo config/default.json para la conexión a MongoDB:
{
  "MONGO_URI": "mongodb+srv://usuario:password@cluster.mongodb.net/integrative_practice",  
  "jwtSecret": "your_jwt_secret",  
  "cookieSecret": "your_cookie_secret"  
}

### 4. Ejecutar el Servidor

📁 Estructura del Proyecto

/src
│  
├── /config  
│   ├── config.js          # 
│   └── database.js        # Conexión a la base de datos MongoDB  
│  
├── /controllers  
│   ├── authController.js  # Controlador de autenticación  
│   └── userController.js  # Controlador de usuarios  
│  
├── /middlewares  
│   ├── authMiddleware.js  # Middleware para autenticación JWT  
│   └── errorHandler.js    # Manejo de errores  
│  
├── /models  
│   └── User.js            # Modelo de usuario  
│  
├── /routes  
│   ├── authRoutes.js      # Rutas de autenticación  
│   └── userRoutes.js      # Rutas de usuarios  
│  
├── /views                 # Vistas con Handlebars  
│   ├── layouts  
│   │   └── main.handlebars # Layout principal  
│   ├── login.handlebars   # Vista de login  
│   └── current.handlebars # Vista de usuario actual  
│  
├── /public                # Archivos públicos (CSS, JS)  
│  
├── app.js              # Archivo principal del servidor  
└── .env                   # Variables de entorno  

```
```

🧩 Rutas Principales
API Rutas de Usuarios (/api/users)
GET / - Obtener todos los usuarios.
POST / - Crear un nuevo usuario.
PUT /:id - Actualizar un usuario.
DELETE /:id - Eliminar un usuario.
Rutas de Autenticación (/api/auth)
POST /login - Iniciar sesión y generar JWT.
GET /logout - Cerrar sesión y limpiar cookies.
Rutas de Vistas (/users)
/login - Formulario de inicio de sesión.
/current - Mostrar datos básicos del usuario logueado.
📚 Tecnologías Utilizadas
Node.js - Entorno de ejecución de JavaScript.
Express - Framework de servidor web.
MongoDB - Base de datos NoSQL.
Mongoose - ODM para MongoDB.
JWT - JSON Web Tokens para autenticación.
Bcrypt - Hashing de contraseñas.
Passport - Middleware de autenticación.
Handlebars - Motor de plantillas para las vistas.
🛡️ Autenticación y Seguridad
Encriptación: Contraseñas encriptadas con bcrypt antes de ser almacenadas.
JWT: Uso de JSON Web Tokens para autenticación y manejo de sesiones.
Cookies Seguras: Almacenamiento de JWT en cookies firmadas y seguras.
⚙️ Configuración Adicional
Tiempo de Vida de Cookies: Configura el tiempo de expiración de las cookies JWT.
Manejo de Errores: Middleware personalizado para el manejo de errores y respuestas HTTP adecuadas.
📝 Contribuciones
¡Las contribuciones son bienvenidas! Por favor, abre un issue o un pull request si tienes mejoras o correcciones.

📄 Licencia
Este proyecto está licenciado bajo la Licencia MIT. Para más detalles, consulta el archivo LICENSE.



### 5.- Instala las siguientes dependencias si no están incluidas en el primer comando:

Express para el servidor web.
Mongoose para la interacción con MongoDB.
Bcrypt para el hashing de contraseñas.
jsonwebtoken para la autenticación con JWT.
Passport y Passport-JWT para las estrategias de autenticación.
Cookie-Parser para manejo de cookies.
Config para manejar la configuración del proyecto.
Dotenv para cargar variables de entorno.
Express-Handlebars para manejar vistas.