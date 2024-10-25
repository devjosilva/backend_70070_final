import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, maxLength: 200 },
  description: { type: String, required: true, maxLength: 255 },
  code: { type: String, required: true, unique: true, maxLength: 100 },
  price: { type: Number, required: true },
  status: { type: Boolean, default: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true, maxLength: 100 },
  thumbnails: { type: [String], required: false }
});

export default mongoose.model('Product', productSchema);
