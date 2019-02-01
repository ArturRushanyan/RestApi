import express from 'express';
import isAuthenticated from '../../helpers/is_authenticated';
import BuyController from './buy.controller';
const router = express.Router(); 

router.post('/', isAuthenticated, BuyController.buy);

export default router;
