import mongoose from 'mongoose';
import JWT from 'jsonwebtoken';
import User from '../../models/User';
import Error from '../../helpers/Errors';
import authenticationWithJoi from '../../helpers/joi_verify';
import generateToken from '../../helpers/Generate_token';
import * as Hash from '../../helpers/hash';
import Constants from '../../helpers/Messages';
import Config from '../../config';

exports.Me = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return Error.sendError(res, 401, Constants.MESSAGES.BAD_REQUEST);
  }
  JWT.verify(token, Config.JWT_KEY, (err, user) => {
    if (err) {
      return Error.sendError(res, 500, Constants.MESSAGES.FAILED_TO_AUTHENTICATE_TOKEN);
    }
    res.status(200).send(user);
  });
};

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
    });
    return newUser.save();
  }).then((result) => {
    const token = generateToken(req.body.email);
    res.cookie(Config.access_token, token, {
      httpOnly: true,
    });
    res.status(200).json({
      message: result,
    });
  }).catch((err) => {
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
    return Hash.CpmparyPassword(req.body.password, user.password);
  }).then(() => {
    const token = generateToken(req.body.email);
    res.cookie(Config.access_token, token, {
      httpOnly: true,
    });
    res.status(200).json({
      message: Constants.MESSAGES.AUTH_SUCCESSFUL
    });
  }).catch((err) => {
    Error.sendError(res, 500, err);
  });
};

exports.Logout = (req, res) => {
  res.clearCookie(Config.access_token);
  res.status(200).send();
};