import JWT from 'jsonwebtoken';
import Error from './Errors';
import Config from '../config';
import Constants from './Messages';

const isAuthenticated = (req, res, next) => {
  const token = req.cookies.access_token;
  const result = JWT.verify(token, Config.JWT_KEY);
  if (!result) {
    return Error.sendError(res, 401, Constants.MESSAGES.YOU_ARE_NOT_LOGGED_IN);
  }
  next();
};

export default isAuthenticated;
