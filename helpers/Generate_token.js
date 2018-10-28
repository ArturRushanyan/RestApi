import JWT from 'jsonwebtoken';
import Config from '../config';

const Generate_token = (email) => {
  const result = JWT.sign({ email }, Config.JWT_KEY);
  return result;
};

export default Generate_token;