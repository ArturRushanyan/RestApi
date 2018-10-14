import JWT from 'jsonwebtoken';
import Error from './errorMessage';
import Config from '../config';

exports.isAuthenticated = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if(!token) {
    Error.sendError(res, 403, 'No token');

  }
  JWT.verify(token, Config.JWT_KEY, (err) => {
    if(err) {
      Error.sendError(res, 500, 'Failed to authenticate token.');
    }
    next();
  });
};
