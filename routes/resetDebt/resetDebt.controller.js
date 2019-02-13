import User from '../../models/User';
import Error from '../../helpers/Errors';
import Constants from '../../helpers/Messages';

// exports.resetAll = (resq, res) => {

// };

exports.resetUserDebt = (req, res) => {
  console.log('+_+_+_+_+_+ log in resetUserDebt');
  const user = req.body.user;
  console.log('+_+_+_+ user =', user);
  User.findOneAndUpdate({ email: user.email }, { $set: {
    mustPay: 0
  }}, { new: true })
  .then(user => {
    if (!user) {
      console.log('+_+_+ user = ', user);
      Error.sendError(res, 404, Constants.MESSAGES.CAN_NOT_FIND_USER);
    }
    return res.status(200).json(user.mustPay);
  })
  .catch(err => Error.sendError(res, 500, err))
};