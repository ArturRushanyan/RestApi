import JWT from 'jsonwebtoken';
import Config from '../config';

const generateToken = (email) => {
  const result = JWT.sign({ email }, Config.JWT_KEY);
  return result;
};

export default generateToken;
