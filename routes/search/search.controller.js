import Item from '../../models/item';
import Error from '../../helpers/errors';
import Constants from '../../helpers/messages';

exports.search = (req, res) => {
  const ItemName = req.params.name;
  if (!ItemName) {
    return Error.sendError(res, 400, Constants.MESSAGES.PLEASE_ENTER_THE_NAME_FOR_SEARCHING_ITEM);
  }
  Item.findOne({ title: ItemName }).then((Item1) => {
    if (!Item1) {
      return Error.sendError(res, 404, Constants.MESSAGES.NO_RESULT);
    }
    return res.status(200).json(Item);
  }).catch((err) => {
    Error.sendError(res, 400, err);
  });
};
