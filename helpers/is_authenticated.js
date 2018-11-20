import JWT from 'jsonwebtoken';
import User from '../models/user';
import Error from './errors';
import Config from '../config';
import Constants from './messages';

const isAuthenticated = (req, res, next) => {
  const token = req.cookies.access_token;
  JWT.verify(token, Config.JWT_KEY, (err, decoded) => {
    if (err) {
      return Error.sendError(res, 401, Constants.MESSAGES.YOU_ARE_NOT_LOGGED_IN);
    }
    User.findOne({
      email: decoded.email,
    }).then((user) => {
      if (user) {
        next();
      }
    }).catch((err) => {
      return Error.sendError(res, 401, err || Constants.MESSAGES.YOU_ARE_NOT_LOGGED_IN);
    });
  });
}

export default isAuthenticated
