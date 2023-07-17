require('dotenv').config();

module.exports = {
    database_url: process.env.DATABASE_URL,
    jwt_secret: process.env.JWT_SECRET,
    PORT: 3000,
  };
  