import User from '../../models/User';
import Item from '../../models/Item';
import Error from '../../helpers/Errors';
import Constants from '../../helpers/Messages'

exports.buy = (req, res) => {
  const userEmail = req.body.email;
  const itemId = req.body.id;
  const itemCount  = req.body.ItemCount;
  const buyQuantity = req.body.buyQuantity;
  let userMustPay = parseInt(req.body.mustPay);
  Item.findOneAndUpdate({ _id: itemId }, { $set: { 
    count: (itemCount - buyQuantity),
  }}, { new: true})
  .then((item) => {
    if (!item) {
      return Error.sendError(res, 404, Constants.MESSAGES.ITEM_NOT_FOUND);
    }
    return User.findOneAndUpdate({ email: userEmail }, { $set: {
      mustPay:  userMustPay,
    }}, { new: true })
    .then((user) => {
      if (!user) {
        return Error.sendError(res, 400, Constants.MESSAGES.BAD_REQUEST);
      } else {
        res.status(200).json(userMustPay);
      }
    }).catch((err) => {
      return Error.sendError(res, 400, err);
    });
  })
};