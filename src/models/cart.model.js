import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  product: { type: String, ref: 'Product', required: true },
  quantity: { type: Number, required: true }
});

const cartSchema = new mongoose.Schema({
  products: { type: [cartItemSchema], required: true }
});

export default mongoose.model('Cart', cartSchema);
