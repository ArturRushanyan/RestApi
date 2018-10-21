import JWT from 'jsonwebtoken';
import Error from './errorMessage';
import Config from '../config';

exports.isAuthenticated = (req, res) => {
  const token = req.headers['access.token'];
  if (!token) {
    Error.sendError(res, 403, 'No token');
    return false;
  }
  JWT.verify(token, Config.JWT_KEY, (err) => {
    if (err) {
      Error.sendError(res, 500, 'Failed to authenticate token.');
    }
    return false;
  });
  return true;
};
