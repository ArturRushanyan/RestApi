import bcrypt from 'bcrypt';

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

    CpmparyPassword(password, UserPassword) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, UserPassword, (err, hash) => {
                if(err) {
                    reject();
                } else if(hash) {
                    resolve(hash);
                }

            })
        });
    };
}

export default new Hash();