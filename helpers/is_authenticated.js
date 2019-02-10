import User from '../models/user';
import Error from './errors';
import Constants from './messages';
import isLoggedIn from './Generate_token';

const isAuthenticated = (req, res, next) => {
  const token = req.body.token;
  isLoggedIn.tokenVerify(res, token)
  .then((user) => User.findOne({ email: user.email }))
  .than((existUser) => {
    if (existUser) {
      next();
    }
  }).catch( err => {
    return Error.sendError(res, 400, err || Constants.MESSAGES.CAN_NOT_FIND_USER);
  })
};

export default isAuthenticated;
