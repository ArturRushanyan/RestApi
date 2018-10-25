import JWT from 'jsonwebtoken';
import Config from '../config';

exports.isAuthenticated = (res, email) => {
  const token = JWT.sign({ email }, Config.JWT_KEY);
  const result = res.cookie('access.token', token, {
    httpOnly: true,
  });
  return result;
};
