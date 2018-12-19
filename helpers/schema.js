import Joi from 'joi';

module.exports = {
  Signup: Joi.object().keys({
    email: Joi.string().email().required().min(3)
      .max(20),
    password: Joi.string().min(6).max(12),
    role: Joi.string().min(6).max(10),
  }),
  Signin: Joi.object().keys({
    email: Joi.string().email().required().min(3)
      .max(20),
    password: Joi.string().min(6).max(12),
    role: Joi.string().min(6).max(10), 
  }),
  itemSchema: Joi.object().keys({
    type: Joi.string().min(3).max(20).required(),
    title: Joi.string().min(3).max(20).required(),
    price: Joi.number().required(),
    count: Joi.number(),
    barcode: Joi.string(),
  }),
};
