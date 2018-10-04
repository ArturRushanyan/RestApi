import Item from '../../models/Item';
import express from 'express';
import Error from '../../helpers/errorMessage';

const router = express.Router();

router.get('/:name', (req, res) => {

    
    const ItemName = req.params.name;

    if(!ItemName) {
        Error(res, 400, 'Please enter the name for searching ')
    } else {
        Item.findOne({title: ItemName}).then(Item => {
            if(Item) {
                res.status(200).json(Item)
            } else {
                Error(res, 404, 'No result');
            }
        }).catch(err => {
            Error(res, 400, err);
        });
    }
});

export default router;
