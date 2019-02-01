import User from '../../models/User';
import Item from '../../models/Item';
import Error from '../../helpers/Errors';
import Constants from '../../helpers/Messages'

exports.buy = (req, res) => {
  console.log('+_+ log1 in buy.controller');
  const userEmail = req.body.email;
  const itemId = req.body.id;
  const itemCount  = req.body.ItemCount;
  const itemPrice = req.body.ItemPrice;
  // Item.findOne({ _id: itemId })
  //   .then(item => {
  //     console.log('+_+ log 2 in buy controller');
  //     item.count -= itemCount;
  //     console.log('+_+ log2.1 in buy.controller')
  //     Item.Update({ id }, { $set: item });
  //     console.log('+_+ log3 in buy.controller');
  //     return User.findOne({ email: userEmail }); 
  //   })
  console.log('+_+ log2 in buy.controller');
  Item.findByIdAndUpdate({_id: itemId}, {$set: {
    count: count - itemCount, 
  }}, { new: true,}
  ).then((item) => {
    console.log('+_+ log in item if case');
    if (!item) {
      console.log('+_+ log in if case have no item');
      return Error.sendError(res, 404, Constants.MESSAGES.ITEM_NOT_FOUND);
    } else {
      console.log('+_+ log in else case if have item');
      return User.findOne({ email: userEmail });
    }
  }).then(user => {
      console.log('+_+ log3 in buy.controller');
      user.mustPay += (itemPrice * count);
      return User.Update({ userEmail }, { $set: user });
    })
    .then(() => {
      console.log('+_+ log4 in buy.controller');
      res.status(200).json({
        message: 'Successfully Buy!!!',
      });
    })
    .catch((err) => {
      console.log('+_+ log5 in buy.controller');
      Error.sendError(res, 400, err);
    });
};

