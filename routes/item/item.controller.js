import Item from '../../models/Item';
import Error from '../../helpers/Errors';
import authenticationWithJoi from '../../helpers/joi_verify';
import Constants from '../../helpers/Messages';

exports.getAll = (req, res) => {
  Item.find().then((Items) => {
    res.send(Items);
  }).catch((err) => {
    Error.sendError(res, 400, err);
  });
};

exports.get = (req, res) => {
  if (!authenticationWithJoi.Item(req, res)) {
    Error.sendError(res, 400, Constants.Messages.BAD_REQUEST);
    return;
  }
  Item.findById(req.params.id).then((item) => {
    if (!item) {
      Error.sendError(res, 404, Constants.Messages.ITEM_NOT_FOUND);
      return;
    }
    res.status(200).json({ item });
  }).catch((err) => {
    Error.sendError(res, 400, err);
  });
};

exports.create = (req, res) => {
  if (!authenticationWithJoi.Item(req, res)) {
    Error.sendError(req, 400, Constants.Messages.ITEM_BODY_CAN_NOT_BE_EMPTY);
    return;
  }
  const NewItem = new Item({
    type: req.body.type,
    title: req.body.title,
    price: req.body.price,
    count: req.body.count,
    barcode: req.body.barcode,
  });
  NewItem.save().then((data) => {
    res.status(200).json({ data });
  }).catch((err) => {
    Error.sendError(res, 500, err || Constants.Messages.SOME_ERROR);
  });
};

exports.update = (req, res) => {
  if (!authenticationWithJoi.Item(req, res)) {
    Error.sendError(req, 400, Constants.Messages.ITEM_BODY_CAN_NOT_BE_EMPTY);
    return;
  }
  Item.findByIdAndUpdate(req.params.id, {
    type: req.body.type,
    title: req.body.title,
    price: req.body.price,
    count: req.body.count,
    barcode: req.body.barcode,
  }, { 
    new: true 
  }).then((item) => {
      if (!item) {
        Error.sendError(res, 404, Constants.Messages.ITEM_NOT_FOUND);
        return;
      }
      res.send(item);
    }).catch((err) => {
      Error.sendError(res, 404, err || Constants.Messages.ITEM_NOT_FOUND);
    });
  Error.sendError(res, 500, Constants.Messages.ERROR_UPDATING_ITEM);
};

exports.remove = (req, res) => {
  Item.findByIdAndRemove(req.params.id)
    .then((item) => {
      if (!item) {
        Error.sendError(res, 404, Constants.Messages.ITEM_NOT_FOUND);
        return;
      }
      res.send({ message: Constants.Messages.ITEM_DELETED_SUCCESSFULLY });
    }).catch((err) => {
      Error.sendError(res, 404, err || Constants.Messages.ITEM_NOT_FOUND);
    });
  Error.sendError(res, 500, Constants.Messages.COULD_NOT_DELETE_ITEM);
};
