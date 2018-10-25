const config = {
  port: 3000,
  Db: {
    url: 'mongodb://localhost:27017/NewSweets',
  },
  JWT_KEY: 'supersecret',
};

module.exports = config;
