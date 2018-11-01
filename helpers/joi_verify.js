import Joi from 'joi';
import Error from './Errors';
import Schema from './schema';

exports.Registration = (req) => {
  const schemaResult = Schema.Signup();
  if (req.body.password !== req.body.confirmPassword) {
    return false;
  }
  const result = Joi.validate(req.body, schemaResult);
  if (!result) {
    return false;
  }
  return true;
};

exports.Login = (req) => {
  const schemaResult = Schema.Signin();
  const result = Joi.validate(req.body, schemaResult);
  if (!result) {
    return false;
  }
  return true;
};

exports.Item = (req, res) => {
  const schemaResult = Schema.itemSchema();
  const result = Joi.validate(req.body, schemaResult);
  if (!result) {
    Error.sendError(res, 400, result.error);
    return false;
  }
  return true;
};
