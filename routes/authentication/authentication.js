import express from 'express'
import Authentication from './authentication.controller'
import joiAuthentication from '../../helpers/joi_verify';
const router = express.Router();

router.post('/signup', joiAuthentication.Joi, Authentication.SignUp);
router.post('/login', joiAuthentication.Joi, Authentication.Login);

export default router;
