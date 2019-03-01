import JWT from 'jsonwebtoken';
import User from '../../models/User';
import Errors from '../../helpers/Errors';
import Constants from '../../helpers/Messages';
import Config from '../../config';

exports.getAll = (req, res) => {
  User.find().then((NewUser) => {
    res.status(200).send(NewUser);
  }).catch((err) => {
    return Errors.sendError(res, 400, err);
  });
};

exports.me = (req, res) => {
  const token = req.cookies.token;
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

exports.get = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: Constants.MESSAGES.USER_NOT_FOUND_WITH_ID + user.id,
        });
      }
      return res.status(200).json({ user });
    }).catch((err) => {
      return Errors.sendError(res, 400, err);
    });
};

exports.update = (req, res) => {
  if (!req.body.type) {
    return Error.sendError(res, 400, Constants.MESSAGES.USER_BODY_CAN_NOT_BE_EMPTY);
  }
  User.findByIdAndUpdate(req.params.id, {
    type: req.body.type,
  }).then((user) => {
    if (!user) {
      return res.status(404).send({
        message: Constants.MESSAGES.USER_NOT_FOUND_WITH_ID + req.params.id,
      });
    }
    return res.status(200).json({ user });
  }).catch((err) => {
    return Error.sendError(res, 500, err);
  });
};
