import Item from '../../models/Item';
import Error from '../../helpers/Errors';
import Constants from '../../helpers/Messages';

exports.search = (req, res) => {
  const ItemName = req.params.name;
  if (!ItemName) {
    Error.sendError(res, 400, Constants.Messages.PLEASE_ENTER_THE_NAME_FOR_SEARCHING_ITEM);
    return;
  }
  Item.findOne({ title: ItemName }).then((Item1) => {
    if (!Item1) {
      Error.sendError(res, 404, Constants.Messages.NO_RESULT);
      return;
    }
    return res.status(200).json(Item);
  }).catch((err) => {
    Error.sendError(res, 400, err);
  });
};
