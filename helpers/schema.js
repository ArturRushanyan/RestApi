import Joi from 'joi';

function Signup() {
  return Joi.object().keys({
    email: Joi.string().email().required().min(3).max(20),
    password: Joi.string().min(6).max(12),
  });
}

function Signin() {
  return Joi.object().keys({
    email: Joi.string().email().required().min(3).max(20),
    password: Joi.string().min(6).max(12),
  });
}

function itemSchema() {
  return Joi.object.keys({
    type: Joi.string().min(3).max(20).required(),
    title: Joi.string().min(3).max(20).required(),
    price: Joi.number().required(),
    count: Joi.number().required(),
  });
}

module.exports = {
  Signup,
  Signin,
  itemSchema,
};
