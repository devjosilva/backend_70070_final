import ProductDAO from '../dao/product.dao.js';
import { ProductDTO } from '../dto/product.dto.js';

class ProductService {
  async getAll(req, res) {
    try {
      const products = await ProductDAO.findAll();
      const productsDTO = products.map(product => new ProductDTO(product));
      res.json(productsDTO);
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async getById(req, res) {
    try {
      const product = await ProductDAO.findById(req.params.pid);
      if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      const productDTO = new ProductDTO(product);
      res.json(productDTO);
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async create(req, res) {
    try {
      const product = await ProductDAO.create(req.body);
      const productDTO = new ProductDTO(product);
      res.status(201).json(productDTO);
    } catch (error) {
      res.status(400).json({ error: 'Datos incorrectos' });
    }
  }

  async update(req, res) {
    try {
      const product = await ProductDAO.update(req.params.pid, req.body);
      if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      const productDTO = new ProductDTO(product);
      res.json(productDTO);
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async remove(req, res) {
    try {
      const product = await ProductDAO.delete(req.params.pid);
      if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}

export default new ProductService();
