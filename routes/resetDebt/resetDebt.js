import express from 'express';
import resetController from './resetDebt.controller';
import isAuthenticated from '../../helpers/is_authenticated';

const router = express.Router();

// router.put('/', isAuthenticated, resetController.resetAll);
// router.put('/id', isAuthenticated, resetController.resetUserDebt);

export default router;