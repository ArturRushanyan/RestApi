import User from '../../models/User';
import Item from '../../models/Item';
import Error from '../../helpers/Errors';

exports.buy = (req, res) => {
  const email = req.body.email;
  const id = req.body._id;
  const count = req.body.count;
  const price = req.body.price;
  Item.findOne({ id })
    .then(item => {
      item.count -= count;
      Item.findByIdAndUpdate(id, {
        type: item.type,
        title: item.title,
        price: item.price,
        count: item.count,
        barcode: item.barcode,
      });
      return User.findOne(email);
    })
    .then(user => {
      user.mustPay
    })

};