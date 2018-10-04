import mongoose from 'mongoose';
import User from '../../models/User';
import Hash from '../../helpers/hash';
import Error from '../../helpers/errorMessage';

exports.SignUp = (req, res) => {
    if(req.body.password !== req.body.confirmPassword) {
        return res.status(500).send({
            message: 'passwords does not match'
        });
    }
    User.find({email: req.body.email}).then(user => {
        if(user.length > 0) {
            return res.status(409).json({
                message: 'Mail exists'
            });
        } 
        Hash.hashingPassword(req.body.password).then(result => {
            if(result) {
                const NewUser = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password: result
                });
                NewUser.save().then(result1 => {
                    console.log(result1);
                    res.status(200).json({
                        message: 'User created'
                    });
                }).catch(err => {
                    Error(res, 500, err);
                });
            }
        }).catch(err => {
            Error(res, 400, err);
        });
    });
};

exports.Login = (req, res) => {
    User.findOne({email: req.body.email}).then(user => {
        if (user.length > 0) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        Hash.CpmparyPassword(req.body.password, user.password).then(result => {         
            if(!result) {
                res.status(401).json({
                    message: 'Auth failed'
                });
            } else {
                res.status(200).json({
                    message: 'Auth successful'
                });  
            } 
        }).catch(err => {
            Error(res, 400, err);
        });
    }).catch(err => {
        Error(res, 400, err);
    });
};



