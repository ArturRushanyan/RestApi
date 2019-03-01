import JWT from 'jsonwebtoken';
import Error from './Errors';
import Config from '../config';
import Constants from './Messages';

exports.newToken = (res, email) => {
  return new Promise((resolve, reject) => {
    if (!email) {
      reject(Error.sendError(res, 400, Constants.MESSAGES.MISSING_MAIL));
    }
    resolve(JWT.sign({ email }, Config.JWT_KEY, { expiresIn: '1h' }));
  }); 
};

exports.tokenVerify = (res, token) => {
  return new Promise((resolve, reject) => {
    if (!token) {
      reject(Error.sendError(res, 400, Constants.MESSAGES.YOU_ARE_NOT_LOGGED_IN));
    }
    resolve(JWT.verify(token, Config.JWT_KEY));
  });
};