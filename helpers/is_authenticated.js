import User from '../models/user';
import Error from './errors';
import Constants from './messages';
// import generateToken from './generate_token';

const isAuthenticated = (req, res, next) => {
  console.log('+_+ is_authenticated log1');
  const userEmail = req.body.email;
  console.log('+_+ req.body.email = ', req.body.email);
  if (userEmail !== 'undefined' && userEmail !== 'null') {
    console.log('+_+ is_authenticated log2');
    User.findOne({
      email: userEmail,
    }).then(user => {
      console.log('+_+ is_authenticated log3');
      if (user) {
        console.log('+_+ is_authenticated log4');
        next();
      }
    }).catch(err => {
      console.log('+_+ is_authenticated log5');
      return Error.sendError(res, 400, err || Constants.MESSAGES.CAN_NOT_FIND_USER);
    });
  } else {
    console.log('+_+ is_authenticated log6');
    return Error.sendError(res, 401, Constants.MESSAGES.YOU_ARE_NOT_LOGGED_IN);
  }
};

export default isAuthenticated;
