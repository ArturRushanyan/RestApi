import fs from 'fs';
import path from 'path';
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
  const startPath = './images';
  if (!authenticationWithJoi.Item(req, res)) {
    return Error.sendError(res, 400, Constants.MESSAGES.BAD_REQUEST);
  }

  if (!fs.existsSync(startPath)) {
    console.log('no dir ', startPath);
    return Error.sendError(res, 404, 'no dir');
  }

  fs.readdir(startPath, (err, file) => {
    if (err) {
      console.log('+_+_+_+_+_+_+_+_+ err in fs.readdir', err);
    }
    for (let i = 0; i < file.length; i++) {
      console.log('+_+_+_+_+_+_+_+ files[i] =>', file[i]);
      if (file[i] === imageId) {
        console.log(' blblblbla+_+_+_+_+_+_+_+_+_+ file[i] =', file[i]);
        return res.status(200).json(file[i]);
      }
    }
  });

  // Item.findOne({ image: imageId }).then((item) => {
  //   if (!item) {
  //     return Error.sendError(res, 404, Constants.MESSAGES.ITEM_NOT_FOUND);
  //   }
  //   res.status(200).json({ item });
  // }).catch((err) => {
  //   Error.sendError(res, 400, err);
  // });
};

exports.create = (req, res) => {
  const date = Date.now().toString();
  const image = req.body.item.image;
  if (!authenticationWithJoi.Item(req, res)) {
    return Error.sendError(req, 400, Constants.MESSAGES.ITEM_BODY_CAN_NOT_BE_EMPTY);
  }
  fs.writeFile(path.resolve('./images', `${date}`), image, 'base64', (error) => {
    if (error) {
      console.log(error);
      return Error(res, 400, error);
    }
  });
  const NewItem = new Item({
    type: req.body.item.type,
    title: req.body.item.title,
    price: req.body.item.price,
    count: req.body.item.count,
    barcode: req.body.item.barcode,
    image: date,
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