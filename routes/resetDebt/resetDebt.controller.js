import User from '../../models/User';
import Error from '../../helpers/Errors';
import Constants from '../../helpers/Messages';

exports.resetAll = (req, res) => {
  const allUsers = req.body.users;
  console.log('+_+_+_+_+ allUsers =', allUsers);
  allUsers.forEach(element => {
    User.findOneAndUpdate({ email: element.email}, { $set: {
      mustPay: 0
    }}, { new: true })
    .catch(err => { return Error.sendError(res, 404, err); })
  });
  res.status(200).json({ message: 'successfully reset' })
};

exports.resetUserDebt = (req, res) => {
  const user = req.body.user;
  User.findOneAndUpdate({ email: user.email }, { $set: {
    mustPay: 0
  }}, { new: true })
  .then(user => {
    if (!user) {
      Error.sendError(res, 404, Constants.MESSAGES.CAN_NOT_FIND_USER);
    }
    return res.status(200).json( 'successfully reset' );
  })
  .catch(err => Error.sendError(res, 500, err))
};