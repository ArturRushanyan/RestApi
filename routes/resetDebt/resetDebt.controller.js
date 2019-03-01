import User from '../../models/User';
import Error from '../../helpers/Errors';
import Constants from '../../helpers/Messages';

exports.resetAll = (req, res) => {
  const allUsers = req.body.users;
  allUsers.forEach(element => {
    User.findOneAndUpdate({ email: element.email }, { 
      $set: {
        mustPay: 0,
      },
    }, { new: true })
      .catch(err => { return Error.sendError(res, 404, err); });
  });
  res.status(200).json({ message: Constants.MESSAGES.SUCCESSFULLY_RESET });
};

exports.resetUserDebt = (req, res) => {
  const user = req.body.user;
  User.findOneAndUpdate({ email: user.email }, { 
    $set: {
      mustPay: 0,
    },
  }, { new: true })
    .then(currentuser => {
      if (!currentuser) {
        Error.sendError(res, 404, Constants.MESSAGES.CAN_NOT_FIND_USER);
      }
      return res.status(200).send({ currentuser });
    })
    .catch(err => Error.sendError(res, 500, err));
};