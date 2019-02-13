import express from 'express';
import resetController from './resetDebt.controller';
import isAuthenticated from '../../helpers/is_authenticated';

const router = express.Router();

// router.put('/allusers', isAuthenticated, resetController.resetAll);
router.post('/', isAuthenticated, resetController.resetUserDebt);

export default router;