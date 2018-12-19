import mongoose from 'mongoose';
import User from '../../models/user';
import Error from '../../helpers/errors';
import authenticationWithJoi from '../../helpers/joi_verify';
import generateToken from '../../helpers/generate_token';
import * as Hash from '../../helpers/hash';
import Constants from '../../helpers/messages';
import Config from '../../config';

exports.SignUp = (req, res) => {
  if (!authenticationWithJoi.Registration(req)) {
    return Error.sendError(res, 500, Constants.MESSAGES.PASSWORDS_DOES_NOT_MATCH);
  }
  User.find({
    email: req.body.email,
  }).then((user) => {
    if (user.length > 0) {
      return Error.sendError(res, 409, Constants.MESSAGES.MAIL_EXISTS);
    }
    return Hash.HashingPassword(req.body.password);
  }).then((hashedPassword) => {
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
    });
    return newUser.save();
  }).then((result) => {
    generateToken.newToken(res, result.email)
      .then(token1 => {
        res.cookie(Config.token, token1, {
          httpOnly: true,
        });
        res.status(200).json({
          user: result.role,
          token: token1,
        });
      });
  })
    .catch((err) => {
      Error.sendError(res, 500, err);
    });
};

exports.Login = (req, res) => {
  if (!authenticationWithJoi.Login(req)) {
    return Error.sendError(res, 400, Constants.MESSAGES.AUTH_FAILED);
  }
  User.findOne({
    email: req.body.email,
  }).then((user) => {
    if (!user) {
      return Error.sendError(res, 401, Constants.MESSAGES.AUTH_FAILED);
    }
    return Hash.ComparyPassword(req.body.password, user.password);
  }).then(() => {
    generateToken.newToken(res, req.body.email)
      .then(token1 => {
        res.cookie(Config.token, token1, {
          httpOnly: true,
        });
        User.findOne({
          email: req.body.email,
        }).then((user1) => {
          return res.status(200).json({
            message: Constants.MESSAGES.AUTH_SUCCESSFUL,
            user: user1.role,
            token: token1,
          });
        });
      });
  }).catch((err) => {
    Error.sendError(res, 500, err);
  });
};

exports.Logout = (req, res) => {
  res.clearCookie(Config.token);
  res.status(200).json({
    message: Constants.MESSAGES.YOU_ARE_LOGGEDOUT,
  });
};
