import Item from '../../models/Item';
import Error from '../../helpers/Errors';
import Messages from '../../helpers/Messages';

exports.search = (req, res) => {
  const ItemName = req.params.name;
  if (!ItemName) {
    Error.sendError(res, 400, Messages.Please_enter_the_name_for_searching_item);
    return;
  }
  Item.findOne({ title: ItemName }).then((Item1) => {
    if (!Item1) {
      Error.sendError(res, 404, Messages.No_result);
    }
    return res.status(200).json(Item);
  }).catch((err) => {
    Error.sendError(res, 400, err);
  });
};
