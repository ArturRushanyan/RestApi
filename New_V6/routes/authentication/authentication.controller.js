import User from '../../models/User';
import logUser from '../../models/User_Login';
import Hash from '../../helpers/hash';
import check_auth from '../../helpers/check-auth';


exports.SignUp = (req, res, next) => {
    console.log("SIGNUP");
    if(req.body.password === req.body.confirmPassword) {
        User.find({email: req.body.email}).then(user => {
            if(user.length >= 1) {
                return res.status(409).json({
                    message: 'Mail exists'
                });
            } else {
                const newUser = new User ({
                    email: req.body.email,
                    password: req.body.password,
                });
                Hash.hashingPassword(newUser, res);
            }
        });
    } else {
        return res.status(500).send({
            message: 'passwords does not match'
        });
    }
};


exports.Login = (check_auth, (req, res, next) => {
    logUser.find({email: req.body.email})
    .then(user => {
        if (user.length < 1) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        } else {
            Hash.Compare(user, req.body.password, res);
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});



