import mongoose from 'mongoose';
import User from '../../models/User';
import Error from '../../helpers/errorMessage';
import * as Hash from '../../helpers/hash';
import Config from '../../config';
import Jwt from 'jsonwebtoken';

exports.SignUp = (req, res) => {
    if(req.body.password !== req.body.confirmPassword) {
        return res.status(500).send({
            message: 'passwords does not match'
        });
    }
    User.find({email:req.body.email}).then(user => {
        if(user.length > 0) {
            return res.status(409).json({
                message: 'Mail exists'
            });
        }
        Hash.HashingPassword(req.body.password).then(hashedPassword => {
            const newUser = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hashedPassword
            });
            return newUser.save().then(result => {
                res.cookie('access_token', token);
                const token = Jwt.sign({id: user._id}, Config.JWT_KEY, {
                    expiresIn: 86400
                });
                res.status(200).json({
                  message: result,
                  token: token
                });
            });
        });
    }).catch(err => {
        Error.sendError(res, 500, err);
    });
};


exports.Login = (req, res) => {
    User.findOne({email: req.body.email}).then(user => {
        if(user.length > 0) {
            Error.sendError(res, 401, 'Auth failed');
        }
        Hash.CpmparyPassword(req.body.password, user.password).then(isPasswordsMatch => {
            if(!isPasswordsMatch) {
                Error.sendError(res, 401, 'Auth failed');
            }
        const token = Jwt.sign({ id: user._id }, Config.JWT_KEY, {
                expiresIn: 86400
            });
        res.cookie('x-access-token', token);
        return res.status(200).json({
                message: 'Auth successful',
                token: token
            });
        });
    }).catch(err => {
        Error.sendError(res, 500, err);
    });
};
