import Joi from 'joi';

function Signup() {
  const R = Joi.object().keys({
    email: Joi.string().email().required().min(3).max(20),
    password: Joi.string().min(6).max(16),
  });
  return R;
}

function Signin() {
  const L = Joi.object().keys({
    email: Joi.string().email().required().min(3).max(20),
    password: Joi.string().min(6).max(12),
  });
  return L;
}

function itemSchema() {
  const result = Joi.object.keys({
    type: Joi.strict().required().min(4),
    title: Joi.string().required().min(4),
    price: Joi.string().required().min(1),
    count: Joi.number().min(1),   
  });
  return result;
}

module.exports = {
  Signup,
  Signin,
  itemSchema,
};
