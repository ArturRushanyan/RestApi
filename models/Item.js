import mongoose from 'mongoose';

const ItemSchema = mongoose.Schema({
  type: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: String, required: true },
  count: { type: Number },
});

module.exports = mongoose.model('Item', ItemSchema);
