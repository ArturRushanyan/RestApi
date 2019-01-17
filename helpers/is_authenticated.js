import User from '../models/user';
import Error from './errors';
import Constants from './messages';

const isAuthenticated = (req, res, next) => {
  const userEmail = req.body.email;
  if (userEmail !== 'undefined' && userEmail !== 'null') {
    User.findOne({
      email: userEmail,
    }).then(user => {
      if (user) {
        next();
      }
    }).catch(err => {
      return Error.sendError(res, 400, err || Constants.MESSAGES.CAN_NOT_FIND_USER);
    });
  } else {
    return Error.sendError(res, 401, Constants.MESSAGES.YOU_ARE_NOT_LOGGED_IN);
  }
};

export default isAuthenticated;
