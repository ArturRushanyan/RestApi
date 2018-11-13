import JWT from 'jsonwebtoken';
import Config from '../config';

const generateToken = (email) => {
  return JWT.sign({ email }, Config.JWT_KEY); 
};

export default generateToken;
