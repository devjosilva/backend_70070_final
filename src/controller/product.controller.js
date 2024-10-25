// src/controllers/product.controller.js
import Product from '../dao/product.dao.js';
import { ProductDTO } from '../dto/product.dto.js';

export const getProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const products = await Product.paginate({}, { page, limit });
        const productsDTO = products.docs.map(product => new ProductDTO(product));
        res.render('products', { products: productsDTO, totalPages: products.totalPages });
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { message: 'Error al obtener productos' });
    }
};

export const getProductById = async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await Product.findById(pid);
        if (!product) {
            return res.status(404).render('error', { message: 'Producto no encontrado' });
        }
        res.render('productDetail', { product: new ProductDTO(product) });
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { message: 'Error al obtener el producto' });
    }
};

export const createProduct = async (req, res) => {
    const newProduct = req.body;
    try {
        const product = await Product.create(newProduct);
        res.status(201).json(new ProductDTO(product));
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Error al crear el producto' });
    }
};

export const updateProduct = async (req, res) => {
    const { pid } = req.params;
    const updatedData = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(pid, updatedData, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(new ProductDTO(updatedProduct));
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Error al actualizar el producto' });
    }
};

export const deleteProduct = async (req, res) => {
    const { pid } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(pid);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
};
