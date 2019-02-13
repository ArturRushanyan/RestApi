import User from '../../models/User';
import Error from '../../helpers/Errors';
import Messages from '../../helpers/Messages';

// exports.resetAll = (resq, res) => {

// };

// exports.resetUserDebt = (req, res) => {
//   const userEmail = req.body.user;
//   User.findOneAndUpdate({ email: userEmail }, { $set: {
//     mustPay: 0
//   }}, { new: true })
//   .then()
//   .catch(err => Error.sendError(res, 500, ))
// };