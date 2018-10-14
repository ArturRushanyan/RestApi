import express from 'express';
import * as itemController from './item.controller';
import IsAuthenticate from '../../helpers/token_verify';

const router = express.Router();

router.get('/', IsAuthenticate.isAuthenticated, itemController.getAll);
router.get('/:id', IsAuthenticate.isAuthenticated, itemController.get);
router.put('/:id', IsAuthenticate.isAuthenticated, itemController.update);
router.post('/', IsAuthenticate.isAuthenticated, itemController.create);
router.delete('/:id', IsAuthenticate.isAuthenticated, itemController.remove);

export default router;
