import bcrypt from 'bcrypt';
import Error from '../helpers/errorMessage';

class Hash {
    constructor() {

    }

    hashingPassword(password) {
        return new Promise((resolve,reject) => {
            bcrypt.hash(password, 10, (err, hash) => {
                if(err) {
                    reject();
                }
                resolve(hash);
            })
        });
    };
}

export default new Hash();