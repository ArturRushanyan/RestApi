import express from 'express';
import * as itemController from './item.controller';
import isAuthenticated from '../../helpers/isAuthenticated';

const router = express.Router();

router.get('/', itemController.getAll);
router.get('/:id', itemController.get);
router.put('/:id', isAuthenticated, itemController.update);
router.post('/', isAuthenticated, itemController.create);
router.delete('/:id', isAuthenticated, itemController.remove);

export default router;
