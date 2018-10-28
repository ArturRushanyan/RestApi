import Item from '../../models/Item';
import Error from '../../helpers/errorMessage';
import authenticationWithJoi from '../../helpers/joi_verify';

exports.getAll = (req, res) => {
  Item.find().then((Items) => {
    res.send(Items);
  }).catch((err) => {
    Error.sendError(res, 400, err);
  });
};

exports.get = (req, res) => {
  if (!authenticationWithJoi.Item(req, res)) {
    Error.sendError(res, 400, 'Bad request');
    return;
  }
  Item.findById(req.params.id).then((item) => {
    if (!item) {
      return res.status(404).send({
        message: 'Item not found',
      });
    }
    res.send(item);
  }).catch((err) => {
    Error.sendError(res, 400, err);
  });
};

exports.create = (req, res) => {
  if (!authenticationWithJoi.Item(req, res)) {
    Error.sendError(req, 400, 'Item body can not be empty');
    return;
  }
  const Item1 = new Item({
    type: req.body.type,
    title: req.body.title,
    price: req.body.price,
    count: req.body.count,
  });

  Item1.save().then((data) => {
    res.send(data);
  }).catch((err) => {
    Error.sendError(res, 500, err || 'Some error occurred while creating the Item.');
  });
};

exports.update = (req, res) => {
  if (!authenticationWithJoi.Item(req, res)) {
    Error.sendError(req, 400, 'Item body can not be empty');
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
        Error.sendError(res, 404, 'Item not found');
        return;
      }
      res.send(item);
    }).catch((err) => {
      Error.sendError(res, 404, err || 'Item not found');
    });
  Error.sendError(res, 500, 'Error updating item');
};

exports.remove = (req, res) => {
  Item.findByIdAndRemove(req.params.id)
    .then((item) => {
      if (!item) {
        Error.sendError(res, 404, 'Item not found');
        return;
      }
      res.send({ message: 'Item deleted successfully!' });
    }).catch((err) => {
      Error.sendError(res, 404, err || 'Item not found');
    });
  Error.sendError(res, 500, 'Could not delete Item');
};
