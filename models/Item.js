import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  type: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  count: { type: Number },
  barcode: { type: String },
});

let Item = null;

try {
  Item = mongoose.model('Item', ItemSchema);
} catch (e) {
  Item = mongoose.model('Item');
}

module.exports = Item;

// import mongoose from 'mongoose';

// const ItemSchema = mongoose.Schema({
//   type: { type: String, required: true },
//   title: { type: String, required: true },
//   price: { type: Number, required: true },
//   count: { type: Number },
//   barcode: { type: String },
// });

// module.exports = mongoose.model('Item', ItemSchema);
