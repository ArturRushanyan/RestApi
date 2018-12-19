import Item from '../../models/item';
import Error from '../../helpers/errors';
import authenticationWithJoi from '../../helpers/joi_verify';
import Constants from '../../helpers/messages';

exports.getAll = (req, res) => {
  Item.find().then((Items) => {
    res.send(Items);
  }).catch((err) => {
    Error.sendError(res, 400, err);
  });
};

exports.get = (req, res) => {
  if (!authenticationWithJoi.Item(req, res)) {
    return Error.sendError(res, 400, Constants.MESSAGES.BAD_REQUEST);
  }
  Item.findById(req.params.id).then((item) => {
    if (!item) {
      return Error.sendError(res, 404, Constants.MESSAGES.ITEM_NOT_FOUND);
    }
    res.status(200).json({ item });
  }).catch((err) => {
    Error.sendError(res, 400, err);
  });
};

exports.create = (req, res) => {
  console.log('+_+_+_+ item.controller log1');
  if (!authenticationWithJoi.Item(req, res)) {
    console.log('+_+_+_+ item.controller log2');
    return Error.sendError(req, 400, Constants.MESSAGES.ITEM_BODY_CAN_NOT_BE_EMPTY);
  }
  console.log('+_+_+_+ item.controller log3');
  const NewItem = new Item({
    type: req.body.type,
    title: req.body.title,
    price: req.body.price,
    count: req.body.count,
    barcode: req.body.barcode,
  });
  console.log('+_+_+_+ item.controller log4');
  NewItem.save().then((data) => {
    console.log('+_+_+_+ item.controller log5');
    res.status(200).json({ data });
  }).catch((err) => {
    console.log('+_+_+_+ item.controller log6');
    Error.sendError(res, 500, err || Constants.MESSAGES.SOME_ERROR);
  });
};

exports.update = (req, res) => {
  if (!authenticationWithJoi.Item(req, res)) {
    return Error.sendError(req, 400, Constants.MESSAGES.ITEM_BODY_CAN_NOT_BE_EMPTY);
  }
  Item.findByIdAndUpdate(req.params.id, {
    type: req.body.type,
    title: req.body.title,
    price: req.body.price,
    count: req.body.count,
    barcode: req.body.barcode,
  }, {
    new: true,
  }).then((item) => {
    if (!item) {
      return Error.sendError(res, 404, Constants.MESSAGES.ITEM_NOT_FOUND);
    }
    res.send(item);
  }).catch((err) => {
    Error.sendError(res, 404, err || Constants.MESSAGES.ITEM_NOT_FOUND);
  });
};

exports.remove = (req, res) => {
  Item.findByIdAndRemove(req.params.id)
    .then((item) => {
      if (!item) {
        return Error.sendError(res, 404, Constants.MESSAGES.ITEM_NOT_FOUND);
      }
      res.send({ message: Constants.MESSAGES.ITEM_DELETED_SUCCESSFULLY });
    }).catch((err) => {
      Error.sendError(res, 404, err || Constants.MESSAGES.ITEM_NOT_FOUND);
    });
};
