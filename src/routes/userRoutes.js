// routes/userRoutes.js
import { Router } from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController.js';
import { authMiddleware  } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', getAllUsers); // Obtener todos los usuarios
router.get('/:id', getUserById); // Obtener un usuario por ID
router.post('/', createUser); // Crear un nuevo usuario
router.put('/:id', updateUser); // Actualizar un usuario existente
router.delete('/:id', deleteUser); // Eliminar un usuario

export default router;
