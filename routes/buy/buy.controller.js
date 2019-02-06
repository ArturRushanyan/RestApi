import User from '../../models/User';
import Item from '../../models/Item';
import Error from '../../helpers/Errors';
import Constants from '../../helpers/Messages'

exports.buy = (req, res) => {
  console.log('+_+_+_+ log1');
  const userEmail = req.body.email;
  const itemId = req.body.id;
  const itemCount  = req.body.ItemCount;
  const buyQuantity = req.body.buyQuantity;
  let userMustPay = parseInt(req.body.mustPay);
  console.log('+_+_+_+ log2');
  Item.findOneAndUpdate({ _id: itemId }, { $set: { 
    count: (itemCount - buyQuantity),
  }}, { new: true})
  .then((item) => {
    setTimeout(() => {
      console.log();
    }, 8000);
    console.log('+_+_+_+ log3');
    if (!item) {
      console.log('+_+_+_+ log4');
      return Error.sendError(res, 404, Constants.MESSAGES.ITEM_NOT_FOUND);
    }
    setTimeout(() => {
      console.log();
    }, 2000);
    return User.findOneAndUpdate({ email: userEmail }, { $set: {
      mustPay:  userMustPay,
    }}, { new: true })
    .then((user) => {
      setTimeout(() => {
        console.log();
      }, 8000);
      console.log('+_+_+_+ log5');
      if (!user) {
        console.log('+_+_+_+ log6');
        return Error.sendError(res, 400, Constants.MESSAGES.BAD_REQUEST);
      } else {
        setTimeout(() => {
          console.log();
        }, 2000);
        setTimeout(() => {
          console.log();
        }, 2000);
        console.log('+_+ log buy.controller sending status');
        console.log('+_+_+_+ userMustPay =', userMustPay);
        res.status(200).json(userMustPay);
      }
    }).catch((err) => {
      console.log('+_+_+_+ log8');
      return Error.sendError(res, 400, err);
    });
  })
};