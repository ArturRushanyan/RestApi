import express from 'express';
import * as itemController from './item.controller';

const router = express.Router();

router.get('/', itemController.getAll);

router.get('/:id', itemController.get);

router.put('/:id', itemController.update);

router.post('/', itemController.create);

router.delete('/:id', itemController.remove);

export default router;
