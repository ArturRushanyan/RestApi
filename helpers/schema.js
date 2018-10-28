import Joi from 'joi';

function Signup() {
  return Joi.object().keys({
    email: Joi.string().email().required().min(3).max(20),
    password: Joi.string().min(6).max(16),
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
    type: Joi.strict().required().min(4),
    title: Joi.string().required().min(4),
    price: Joi.string().required().min(1),
    count: Joi.number().min(1),
  });
}

module.exports = {
  Signup,
  Signin,
  itemSchema,
};
