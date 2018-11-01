import express from 'express';
import * as itemController from './item.controller';
import loginVerify from '../../helpers/loginVerify';

const router = express.Router();

router.get('/', itemController.getAll);
router.get('/:id', itemController.get);
router.put('/:id', loginVerify, itemController.update);
router.post('/', loginVerify, itemController.create);
router.delete('/:id', loginVerify, itemController.remove);

export default router;
