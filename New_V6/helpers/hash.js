import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';

class Hash {
    constructor() {

    }

    hashingPassword(newUser, res) {
        bcrypt.hash(newUser.password, 10, (err, hash) => {
            if(err) {
                return res.status(500).json({
                    error: err
                });
            } else {
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email: newUser.email,
                    password: hash,
                    confirmPassword: hash
                });
                user.save().then(result => {
                    console.log(result);
                    res.status(201).json({
                        message: 'User created'
                    });
                }).catch(err => {
                    console.log(err);
                    return 500;
                });
            }
        });
    };


    Compare(user, Login_Password, res ) {
        bcrypt.compare(Login_Password, user[0].password, (err, result) => {
            if(err) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            if(result) {
                const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                }, config.JWT_KEY,
                {
                    expiresIn: '1h'
                });
                return res.status(200).json({
                    message: 'Auth successful',
                    token: token
                }); 
            }
            return res.status(401).json({
                message: 'Auth failed'
            });
        });
    };
};

export default new Hash();
