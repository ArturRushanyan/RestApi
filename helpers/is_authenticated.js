import User from '../models/User';
import Error from './Errors';
import Constants from './Messages';
import isLoggedIn from './Generate_token';

const isAuthenticated = (req, res, next) => {
  const token = req.body.token;
  if (token !== undefined && token !== null) {
    isLoggedIn.tokenVerify(res, token)
      .then(user => User.findOne({ email: user.email }))
      .then((existUser) => {
        if (existUser) {
          next();
        }
      }).catch(err => {
        return Error.sendError(res, 400, err || Constants.MESSAGES.CAN_NOT_FIND_USER);
      });
  } else {
    return Error.sendError(res, 403, Constants.MESSAGES.FAILED_TO_AUTHENTICATE_TOKEN);
  }
};

export default isAuthenticated;
