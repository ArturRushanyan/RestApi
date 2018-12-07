import User from '../models/user';
import Error from './errors';
import Constants from './messages';
import generateToken from './generate_token';

const isAuthenticated = (req, res, next) => {
  const token = req.cookies.access_token;
  if (token) {
    console.log('+_+_+_+- token', token);
    generateToken.tokenVerify(res, token)
      .then(decoded => User.findOne({
        email: decoded.email,
      }))
      .then(user => {
        if (user) {
          next();
        }
      }).catch(err => {
        return Error.sendError(res, 401, err || Constants.MESSAGES.YOU_ARE_NOT_LOGGED_IN);
      });
  } else {
    return Error.sendError(res, 400, Constants.MESSAGES.BAD_REQUEST);
  }
};

export default isAuthenticated;
