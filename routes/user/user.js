import express from 'express';
import * as userController from './user.controller';

const router = express.Router();

// router.get('/', userController.getAll);
router.get('/me', userController.me);
router.get('/:id', userController.get);
router.put('/:id', userController.update);

export default router;
