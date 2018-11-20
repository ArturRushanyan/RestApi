import express from 'express';
import Authentication from './authentication.controller';

const router = express.Router();

router.get('/logout', Authentication.Logout);
router.post('/signup', Authentication.SignUp);
router.post('/login', Authentication.Login);

export default router;
