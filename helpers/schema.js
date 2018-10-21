import Joi from 'joi';
import Error from './errorMessage';

function Signup(req, res) {
  if (req.body.password !== req.body.confirmPassword) {
    Error.sendError(res, 500, 'passwords does not match');
  }
  const R = Joi.object().keys({
    email: Joi.string().email().required().min(3).max(20),
    password: Joi.string().min(6).max(16),
  });
  return !R ? false : true;
}

function Signin() {
  const L = Joi.object().keys({
    email: Joi.string().email().required().min(3).max(20),
    password: Joi.string().min(6).max(12),
  });
  return !L ? false : true;
}

function itemSchema() {
  const result = Joi.object.keys({
    type: Joi.strict().required().min(4),
    title: Joi.string().required().min(4),
    price: Joi.string().required().min(1),
    count: Joi.number().min(1),   
  });
  return !result ? false : true;
}

module.exports = {
  Signup: Signup,
  Signin: Signin,
  itemSchema: itemSchema,
};
