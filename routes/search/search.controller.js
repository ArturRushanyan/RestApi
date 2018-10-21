import Item from '../../models/Item';
import Error from '../../helpers/errorMessage';

exports.search = (req, res) => {
  const ItemName = req.params.name;
  if (!ItemName) {
    Error.sendError(res, 400, 'Please enter the name for searching item');
    return;
  }
  Item.findOne({ title: ItemName }).then((Item) => {
    if (!Item) {
      Error.sendError(res, 404, 'No result');
    }
    return res.status(200).json(Item);
  }).catch((err) => {
    Error.sendError(res, 400, err);
  });
};
