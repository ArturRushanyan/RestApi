import mongoose from 'mongoose';
import User from '../../models/User';
import Hash from '../../helpers/hash';
import Error from '../../helpers/errorMessage';
import check_auth from '../../helpers/check-auth';
import bcrypt from 'bcrypt';



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
    })

    
};

exports.Login = (req, res) => {
    User.findOne({email: req.body.email}).then(user => {
        if (user.length > 0) {
            console.log('_+_+_+_+_+_+_+___ log1');
            return res.status(401).json({
                message: 'Auth failed1'
            });
        }
        Hash.hashingPassword(req.body.password).then(result => {    
            console.log('result        ' + result);     
            console.log('user.password ' + user.password);     
            if(result !== user.password) {
                res.status(401).json({
                    message: 'Auth failed2'
                });
            } else {
                res.status(200).json({
                    message: 'Auth successful'
                });  
            } 
        }).catch(err => {
            console.log('_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+ log3');
            //Error(res, 400, err);
        });
    }).catch();
        




        /*
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
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
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    */




    
    
    
    ///////////////////////////////////////////////////
    /*User.findOne({email: req.body.email})
    .then(user => {
        if (user.length < 1) {
            console.log('_+_+_+_+ log1');
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        Hash.hashingPassword(req.body.password).then(result => {
            console.log('_+_+_+ result = ' + result)
            console.log('_+_+_+_+ user.password = ' + user.password);
            if(result !== user.password) {
                console.log('_+_+_+_+ log2');
                return res.status(401).json({
                    message: 'Auth failed'
                })
            }
            console.log('_+_+_+_+ log3');
            return res.status(200).json({
                message: 'Auth successful',
                token: token
            }); 

            const token = jwt.sign({
                email: user[0]
            })

        }).catch(err => {
            Error(res, 400, err);
        });
        */
        ///////////////////////////////////////////////////
        /*if(hash && user.password === hash) {
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
        } else {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });*/
};



