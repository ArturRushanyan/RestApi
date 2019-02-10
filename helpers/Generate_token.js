import JWT from 'jsonwebtoken';
import Error from './errors';
import Config from '../config';
import Constants from './messages';

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
    console.log('+_+ token in tokenverify func =', token);
    if (!token) {
      console.log('+_+_+_+_+ in if case err in tokenverify func');
      reject(Error.sendError(res, 400, Constants.MESSAGES.YOU_ARE_NOT_LOGGED_IN));
    }
    console.log('+_+_+_+_++ in resolve case tokenverify func');
    resolve(JWT.verify(token, Config.JWT_KEY));
  });
};