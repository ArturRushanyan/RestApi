import User from '../models/user';
import Error from './errors';
import Constants from './messages';
import generateToken from './generate_token';

const isAuthenticated = (req, res, next) => {
  console.log('+_+_+_+ is_authenticated log1');
  const token = req.cookies.token;
  if (token) {
    console.log('+_+_+_+ is_authenticated log2');
    generateToken.tokenVerify(res, token)
      .then(decoded => User.findOne({
        email: decoded.email,
      }))
      .then(user => {
        if (user) {
          console.log('+_+_+_+ is_authenticated log3');
          next();
        }
      }).catch(err => {
        console.log('+_+_+_+ is_authenticated log4');
        return Error.sendError(res, 401, err || Constants.MESSAGES.YOU_ARE_NOT_LOGGED_IN);
      });
  } else {
    console.log('+_+_+_+ is_authenticated log5');
    return Error.sendError(res, 400, Constants.MESSAGES.YOU_ARE_NOT_LOGGED_IN);
  }
};

export default isAuthenticated;
