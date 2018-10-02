import User from '../../models/User';
import errors from '../../helpers/errorMessage';

exports.getAll = (req, res) => {
    User.find().then((User) => {
        res.send(User);
    }).catch((err) => {
        errors.sendError(res, 400, err);
    });
};

exports.get = (req, res) => {
    User.findById(req.params.id).then((user) => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        res.send(user);
    }).catch((err) => {
        errors.sendError(res, 400, err);
    });
};


exports.update = (req, res) => {
    if(!req.body.type) {
        return res.status(400).send( {
            message: "User body can not be empty"
        });
    }

    User.findByIdAndUpdate(req.params.id, {
        type: req.body.type,
    })
    .then((user) => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch((err) => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.userId
        });
    });
};
