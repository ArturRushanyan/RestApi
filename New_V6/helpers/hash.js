import bcrypt from 'bcrypt';
import Error from '../helpers/errorMessage';



class Hash {
    constructor() {

    }

    hashingPassword(password) {
        bcrypt.hash(password, 10).then(hash => {
            if(hash) {
                return hash;
            }
        }).catch(err => {
            Error(res, 400, err);
        });

    };
}

export default new Hash();