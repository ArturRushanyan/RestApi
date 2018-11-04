import mongoose from 'mongoose';
import User from '../../models/User';
import Error from '../../helpers/Errors';
import authenticationWithJoi from '../../helpers/joi_verify';
import generateToken from '../../helpers/Generate_token';
import * as Hash from '../../helpers/hash';
import Constants from '../../helpers/Messages';
import Config from '../../config';

exports.SignUp = (req, res) => {
  if (!authenticationWithJoi.Registration(req)) {
    Error.sendError(res, 500, Constants.Messages.PASSWORDS_DOES_NOT_MATCH);
    return;
  }
  User.find({ 
    email: req.body.email 
  }).then((user) => {
    if (!user) {
      Error.sendError(res, 409, Constants.Messages.MAIL_EXISTS);
      return;
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
    Error.sendError(res, 400, Constants.Messages.AUTH_FAILED);
    return;
  }
  User.findOne({ 
    email: req.body.email 
  }).then((user) => {
    if (!user) {
      Error.sendError(res, 401, Constants.Messages.AUTH_FAILED);
      return;
    }
    return Hash.CpmparyPassword(req.body.password, user.password);
  }).then(() => {
    const token = generateToken(req.body.email);
    res.cookie(Config.access_token, token, {
      httpOnly: true,
    });
    res.status(200).json({
      message: Constants.Messages.AUTH_SUCCESSFUL,
    });
  }).catch((err) => {
    Error.sendError(res, 500, err);
  });
};
