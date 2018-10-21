import Item from '../../models/Item';
import Error from '../../helpers/errorMessage';
import IsAuthenticate from '../../helpers/token_verify';

exports.getAll = (req, res) => {
  Item.find().then((Items) => {
    res.send(Items);
  }).catch((err) => {
    Error.sendError(res, 400, err);
  });
};

exports.get = (req, res) => {
  if (!IsAuthenticate.Item(req, res)) {
    Error.sendError(res, 400, 'Bad request');
    return;
  }
  Item.findById(req.params.id).then((item) => {
    if (!item) {
      return res.status(404).send({
        message: "Item not found with id " + req.params.id,
      });
    }
    res.send(item);
  }).catch((err) => {
    Error.sendError(res, 400, err);
  });
};

exports.create = (req, res) => {
  if (!IsAuthenticate.Item(req, res)) {
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
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Item.",
    });
  });
};

exports.update = (req, res) => {
  if (!IsAuthenticate.Item(req, res)) {
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
        return res.status(404).send({
          message: "Item not found with id " + req.params.itemId,
        });
      }
      res.send(item);
    }).catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Item not found with id " + req.params.itemId,
        });
      }
      return res.status(500).send({
        message: "Error updating item with id " + req.params.itemId,
      });
    });
};

exports.remove = (req, res) => {
  Item.findByIdAndRemove(req.params.id)
    .then((item) => {
      if (!item) {
        return res.status(404).send({
          message: "Item not found with id " + req.params.itemId,
        });
      }
      res.send({ message: "Item deleted successfully!" });
    }).catch((err) => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "Item not found with id " + req.params.itemId,
        });
      }
      return res.status(500).send({
        message: "Could not delete Item with id " + req.params.itemId,
      });
    });
};
