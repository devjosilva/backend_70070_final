// src/routes/products.router.js
import express from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from './src/controllers/product.controller.js';

const router = express.Router();

// Obtener todos los productos
router.get('/', getProducts);

// Obtener un producto específico
router.get('/:pid', getProductById);

// Crear un nuevo producto
router.post('/', createProduct);

// Actualizar un producto
router.put('/:pid', updateProduct);

// Eliminar un producto
router.delete('/:pid', deleteProduct);

export default router;
