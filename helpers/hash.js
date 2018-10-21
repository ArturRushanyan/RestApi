import bcrypt from 'bcrypt';

exports.HashingPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(hash);
    });
  });
};

exports.CpmparyPassword = (password, UserPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, UserPassword, (err, hash) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(hash);
    });
  });
};
