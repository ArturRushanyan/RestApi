import User from '../models/user';
import Error from './errors';
import Constants from './messages';
import isLoggedIn from './Generate_token';

const isAuthenticated = (req, res, next) => {
  console.log('+_+_+ log1 in is Authenticated');
  const token = req.body.token;
  console.log('+_+_+ log for token =', token);
  console.log('+_+_+ log2 in is Authenticated');
  if (token !== undefined && token !== null) {
    console.log('+_+_+ log3 in is Authenticated');
    isLoggedIn.tokenVerify(res, token)
    .then(user => User.findOne({ email: user.email }))
    .then((existUser) => {
      console.log('+_+_+ log4 in is Authenticated');
      if (existUser) {
        console.log('+_+_+ log5 in is Authenticated');
        next();
      }
    }).catch( err => {
      console.log('+_+_+ log6 in is Authenticated');
      return Error.sendError(res, 400, err || Constants.MESSAGES.CAN_NOT_FIND_USER);
    })
    } else {
      console.log('+_+_+ log7 in is Authenticated');
      return Error.sendError(res, 403, Constants.MESSAGES.FAILED_TO_AUTHENTICATE_TOKEN);
    }
};

export default isAuthenticated;
