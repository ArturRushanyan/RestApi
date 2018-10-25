import mongoose from 'mongoose';
import User from '../../models/User';
import Error from '../../helpers/errorMessage';
import * as Hash from '../../helpers/hash';
import authenticationWithJoi from '../../helpers/joi_verify';
import Token from '../../helpers/token_verify';

exports.SignUp = (req, res) => {
  if (!authenticationWithJoi.Registration(req, res)) {
    Error.sendError(res, 400, 'Bad request');
  }
  return User.find({ email: req.body.email }).then((user) => {
    if (user.length > 0) {
      return res.status(409).json({
        message: 'Mail exists',
      });
    }
    return Hash.HashingPassword(req.body.password);
  }).then((hashedPassword) => {
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      password: hashedPassword,
    });
    return newUser.save();
  }).then((result) => {
    if (!Token.isAuthenticated(res, req.body.email)) {
      Error.sendError(res, 403, 'No token');
    }
    res.status(200).json({
      message: result,
    });
  })
    .catch((err) => {
      Error.sendError(res, 500, err);
    });
};


exports.Login = (req, res) => {
  if (!authenticationWithJoi.Login(req, res)) {
    Error.sendError(res, 400, 'Bad request');
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user.length > 0) {
      Error.sendError(res, 401, 'Auth failed');
    }
    return Hash.CpmparyPassword(req.body.password, user.password);
  }).then((isPasswordsMatch) => {
    if (!isPasswordsMatch) {
      Error.sendError(res, 401, 'Auth failed');
    }
    if (Token.isAuthenticated(res, req.body.email)) {
      res.status(200).json({
        message: 'Auth successful',
      });
    }
  }).catch((err) => {
    Error.sendError(res, 500, err);
  });
};
