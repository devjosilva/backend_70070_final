import Product from '../models/product.model.js';

class ProductDAO {
  async findAll() {
    return Product.find();
  }

  async findById(id) {
    return Product.findById(id);
  }

  async create(productData) {
    return Product.create(productData);
  }

  async update(id, updateData) {
    return Product.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id) {
    return Product.findByIdAndDelete(id);
  }
}

export default new ProductDAO();
