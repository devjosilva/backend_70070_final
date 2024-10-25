// src/config/routes.config.js

import authRouter from '../routes/auth.router.js';
import cartsRouter from '../routes/carts.router.js';
import productsRouter from '../routes/products.router.js';
import userRouter from '../routes/user.router.js';
import viewsRouter from '../routes/views.router.js';

const configureRoutes = (app) => {
    // Configuración de las rutas de la API
    app.use('/api/auth', authRouter);
    app.use('/api/carts', cartsRouter);
    app.use('/api/products', productsRouter);
    app.use('/api/users', userRouter);
    
    // Configuración de las rutas de vistas
    app.use('/', viewsRouter);
    
    // Ruta para manejar errores 404
    app.use('*', (req, res) => {
        res.status(404).render('404', { title: 'Pagina no encontrada' });
    });
};

export default configureRoutes;
