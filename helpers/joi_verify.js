import Joi from 'joi';
import Schema from './schema';

exports.Registration = (req) => {
  const schemaResult = Schema.Signup;
  if (req.body.password !== req.body.confirmPassword) {
    return false;
  }
  const result = Joi.validate(req.body, schemaResult);
  return !!result;
};

exports.Login = (req) => {
  const schemaResult = Schema.Signin;
  const result = Joi.validate(req.body, schemaResult);
  return !!result;
};

exports.Item = (req, res) => {
  const schemaResult = Schema.itemSchema;
  const result = Joi.validate(req.body, schemaResult);
  return !!result;
};
