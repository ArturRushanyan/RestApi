import jwt from 'jsonwebtoken';
import config from '../config';

module.exports = (req, res, next) => {
    try {
        const decoded= jwt.verify(req.body.token, config.JWT_KEY); 
        req.userDate = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
    
}