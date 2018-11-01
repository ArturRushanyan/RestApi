import JWT from 'jsonwebtoken';
import Error from './Errors';
import Config from '../config';

const isAuthenticated = (req, res, next) => {
  const token = req.cookies.access_token;
  const result = JWT.verify(token, Config.JWT_KEY);
  if (!result) {
    return Error.sendError(res, 401, 'You are not logged in');
  }
  next();
};

export default isAuthenticated;
