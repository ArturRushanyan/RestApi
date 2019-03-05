import Item from '../../models/Item';
import Error from '../../helpers/Errors';
import authenticationWithJoi from '../../helpers/joi_verify';
import Constants from '../../helpers/Messages';

exports.getAll = (req, res) => {
  Item.find().then((Items) => {
    res.status(200).json(Items);
  }).catch((err) => {
    Error.sendError(res, 400, err);
  });
};

exports.get = (req, res) => {
  const imageId = req.params.id;
  Item.findOne({ image: imageId }).then((item) => {
    if (!item) {
      return Error.sendError(res, 404, Constants.MESSAGES.ITEM_NOT_FOUND);
    }
    res.status(200).json({ item });
  }).catch((err) => {
    Error.sendError(res, 400, err);
  });
};

exports.create = (req, res) => {
  if (!authenticationWithJoi.Item(req, res)) {
    return Error.sendError(req, 400, Constants.MESSAGES.ITEM_BODY_CAN_NOT_BE_EMPTY);
  }
  const NewItem = new Item({
    type: req.body.item.type,
    title: req.body.item.title,
    price: req.body.item.price,
    count: req.body.item.count,
    barcode: req.body.item.barcode,
    image: req.body.item.image,
  });
  NewItem.save().then(data => {
    res.status(200).json({ data });
  }).catch((err) => {
    Error.sendError(res, 500, err || Constants.MESSAGES.SOME_ERROR);
  });
};

exports.update = (req, res) => {
  if (!authenticationWithJoi.Item(req, res)) {
    return Error.sendError(req, 400, Constants.MESSAGES.ITEM_BODY_CAN_NOT_BE_EMPTY);
  }
  Item.findByIdAndUpdate(req.params.id, {
    type: req.body.item.type,
    title: req.body.item.title,
    price: req.body.item.price,
    count: req.body.item.count,
    barcode: req.body.item.barcode,
    image: req.body.item.image,
  }, {
    new: true,
  }).then((item) => {
    if (!item) {
      return Error.sendError(res, 404, Constants.MESSAGES.ITEM_NOT_FOUND);
    }
    res.status(200).json({
      message: Constants.MESSAGES.SUCCESSFULLY_UPDATED,
    });
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