import Joi from 'joi';
import Error from './errorMessage';
import Schema from './schema';

exports.Registration = (req, res) => {
  const schemaResult = Schema.Signup(req, res);
  const result = Joi.validate(req.body, schemaResult);
  if (!result) {
    Error.sendError(res, 400, result.error);
    return false;
  }
  return true;
};

exports.Login = (req, res) => {
  const schemaResult = Schema.Signin();
  const result = Joi.validate(req.body, schemaResult);
  if (!result) {
    Error.sendError(res, 400, result.error);
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
