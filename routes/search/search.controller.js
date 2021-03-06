import Item from '../../models/Item';
import Error from '../../helpers/Errors';
import Constants from '../../helpers/Messages';

exports.search = (req, res) => {
  const ItemName = req.params.name;
  if (!ItemName) {
    return Error.sendError(res, 400, Constants.MESSAGES.PLEASE_ENTER_THE_NAME_FOR_SEARCHING_ITEM);
  }
  Item.find({ title: ItemName }).then((Item1) => {
    if (!Item1) {
      return Error.sendError(res, 404, Constants.MESSAGES.NO_RESULT);
    }
    return res.status(200).json(Item1);
  }).catch((err) => {
    Error.sendError(res, 400, err);
  });
};
