import Item from '../../models/Item';
import express from 'express';
import Error from '../../helpers/errorMessage';
import IsAuthenticate from '../../helpers/token_verify';

const router = express.Router();      

router.get('/:name', IsAuthenticate.isAuthenticated, (req, res) => {

    const ItemName = req.params.name;
    if(!ItemName) {
        Error(res, 400, 'Please enter the name for searching item');
        return 
    }
    Item.findOne({title: ItemName}).then(Item => {
        if(!Item) {
            Error(res, 404, 'No result');  
        } 
        return res.status(200).json(Item);
    }).catch(err => {
        Error(res, 400, err);
    });
});

export default router;