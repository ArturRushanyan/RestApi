import JWT from 'jsonwebtoken';
import Error from './errors';
import Config from '../config';
import Constants from './messages';

exports.newToken = (res, email) => {
  return new Promise((resolve, reject) => {
    if (!email) {
      reject(Error.sendError(res, 400, Constants.MESSAGES.MISSING_MAIL));
    }
    resolve(JWT.sign({ email }, Config.JWT_KEY));
  }); 
};

exports.tokenVerify = (req, res, token) => {
  console.log('+_+_+ generate token log1');
  return new Promise((resolve, reject) => {
    if (!token) {
      console.log('+_+_+ generate token log2');
      reject(Error.sendError(res, 400, Constants.MESSAGES.YOU_ARE_NOT_LOGGED_IN));
    }
    console.log('+_+_+ generate token log3');
    resolve(JWT.verify(token, Config.JWT_KEY));
  });
};