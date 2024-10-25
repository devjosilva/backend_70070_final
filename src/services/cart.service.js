import CartDAO from '../dao/cart.dao.js';
import ProductDAO from '../dao/product.dao.js';
import TicketDAO from '../dao/ticket.dao.js';
import { v4 as uuidv4 } from 'uuid';

class CartService {
  async purchase(req, res) {
    try {
      const cart = await CartDAO.findById(req.params.cid);
      if (!cart) return res.status(404).json({ error: 'Carrito no encontrado.' });

      const unprocessedProducts = [];
      let totalAmount = 0;

      for (const item of cart.products) {
        const product = await ProductDAO.findById(item.product);
        if (product.stock >= item.quantity) {
          product.stock -= item.quantity;
          await ProductDAO.update(product._id, product);
          totalAmount += product.price * item.quantity;
        } else {
          unprocessedProducts.push(product._id);
        }
      }

      const ticket = await TicketDAO.create({
        code: uuidv4(),
        amount: totalAmount,
        purchaser: req.user.email,
      });

      cart.products = cart.products.filter(item => unprocessedProducts.includes(item.product));
      await CartDAO.update(cart._id, cart);

      res.status(201).json({ ticket, unprocessedProducts });
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}

export default new CartService();
