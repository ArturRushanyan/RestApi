import Item from '../../models/Item';
import Error from '../../helpers/Errors';
import authenticationWithJoi from '../../helpers/joi_verify';
import Messages from '../../helpers/Messages';

exports.getAll = (req, res) => {
  Item.find().then((Items) => {
    res.send(Items);
  }).catch((err) => {
    Error.sendError(res, 400, err);
  });
};

exports.get = (req, res) => {
  if (!authenticationWithJoi.Item(req, res)) {
    Error.sendError(res, 400, Messages.Bad_request);
    return;
  }
  Item.findById(req.params.id).then((item) => {
    if (!item) {
      Error.sendError(res, 404, Messages.Item_not_found);
      return;
    }
    res.status(200).json({ item });
  }).catch((err) => {
    Error.sendError(res, 400, err);
  });
};

exports.create = (req, res) => {
  if (!authenticationWithJoi.Item(req, res)) {
    Error.sendError(req, 400, Messages.Item_body_can_not_be_empty);
    return;
  }
  const NewItem = new Item({
    type: req.body.type,
    title: req.body.title,
    price: req.body.price,
    count: req.body.count,
  });
  NewItem.save().then((data) => {
    res.status(200).json({ data });
  }).catch((err) => {
    Error.sendError(res, 500, err || Messages.Some_error);
  });
};

exports.update = (req, res) => {
  if (!authenticationWithJoi.Item(req, res)) {
    Error.sendError(req, 400, Messages.Item_body_can_not_be_empty);
    return;
  }
  Item.findByIdAndUpdate(req.params.id, {
    type: req.body.type,
    title: req.body.title,
    price: req.body.price,
    count: req.body.count,
  }, { new: true })
    .then((item) => {
      if (!item) {
        Error.sendError(res, 404, Messages.Item_not_found);
        return;
      }
      res.send(item);
    }).catch((err) => {
      Error.sendError(res, 404, err || Messages.Item_not_found);
    });
  Error.sendError(res, 500, Messages.Error_updating_item);
};

exports.remove = (req, res) => {
  Item.findByIdAndRemove(req.params.id)
    .then((item) => {
      if (!item) {
        Error.sendError(res, 404, Messages.Item_not_found);
        return;
      }
      res.send({ message: Messages.Item_deleted_successfully });
    }).catch((err) => {
      Error.sendError(res, 404, err || Messages.Item_not_found);
    });
  Error.sendError(res, 500, Messages.Could_not_delete_Item);
};
