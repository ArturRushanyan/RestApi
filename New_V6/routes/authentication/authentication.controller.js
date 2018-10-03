import mongoose from 'mongoose';
import User from '../../models/User';
import Hash from '../../helpers/hash';
import Error from '../../helpers/errorMessage';
import check_auth from '../../helpers/check-auth';


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
                    password: req.body.password
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
        }).catch();
    })

    
};



exports.Login = (req, res) => {
    User.find({email: req.body.email})
    .then(user => {
        if (user.length < 1) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        let hash = Hash.hashingPassword(req.body.password);
        if(hash && user.password === hash) {
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
    });
};



