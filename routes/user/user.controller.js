import User from '../../models/User';
import Errors from '../../helpers/Errors';
import Messages from '../../helpers/Messages';


exports.getAll = (req, res) => {
  User.find().then((NewUser) => {
    res.status(200).json({ NewUser });
  }).catch((err) => {
    Errors.sendError(res, 400, err);
  });
};

exports.get = (req, res) => {
  User.findById(req.params.id).then((user) => {
    if (!user) {
      return res.status(404).send({
        message: Messages.User_not_found_with_id + user.id,
      });
    }
    return res.status(200).json({ user });
  }).catch((err) => {
    Errors.sendError(res, 400, err);
  });
};

exports.update = (req, res) => {
  if (!req.body.type) {
    Error.sendError(res, 400, Messages.User_body_can_not_be_empty);
    return;
  }

  User.findByIdAndUpdate(req.params.id, {
    type: req.body.type,
  }).then((user) => {
    if (!user) {
      return res.status(404).send({
        message: Messages.User_not_found_with_id + req.params.id,
      });
    }
    return res.status(200).json({ user });
  }).catch((err) => {
    Error.sendError(res, 500, err);
  });
};
