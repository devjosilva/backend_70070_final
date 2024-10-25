import Cart from '../models/cart.model.js';

export class CartDAO {
    async createCart() {
        const newCart = new Cart({ products: [] });
        return await newCart.save();
    }

    async getCartById(cartId) {
        return await Cart.findById(cartId).populate('products.product');
    }

    async addProductToCart(cartId, productId, quantity) {
        const cart = await this.getCartById(cartId);
        const existingProduct = cart.products.find(item => item.product.toString() === productId);
        
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }
        return await cart.save();
    }

    // Otros métodos según sea necesario
}
