import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const userId = mongoose.Schema.Types.ObjectId;

const UserSchema = new Schema({
  _id: userId,
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: { type: String, required: true },
  role: { type: String, required: true, default: 'user' },
  mustPay: { type: Number, default: 0 },
});

let User = null;

try {
  User = mongoose.model('User', UserSchema);
} catch (e) {
  User = mongoose.model('User');
}

module.exports = User;