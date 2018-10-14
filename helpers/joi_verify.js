import Joi from 'joi';
import Error from './errorMessage';

exports.Joi = (req, res, next) => {
    const JoiSchema = Joi.object().keys({
        email: Joi.string().email().required().min(3).max(20),
        password: Joi.string().min(8).max(12),
    });
    const result = Joi.validate(req.body, JoiSchema);
    if(!result) {
        Error.sendError(res, 400, result.error);
        return;
    }
    return next();
}; 


/*
module.exports = {
    UserSchema: (JoiSchema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, JoiSchema);
            if(!result) {
                Error.sendError(res, 400, result.error);
                return
            }
            next();
        }   
    }
}
*/