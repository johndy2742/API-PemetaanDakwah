const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = {
  generateJwt(params = {}) {
    return jwt.sign(params, config.jwt_secret, {
      expiresIn: '365d',
    });
  },
};
