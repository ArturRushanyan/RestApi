
import express from 'express';
import searchController from './search.controller';

const router = express.Router();

router.get('/:name', searchController.search);

export default router;
