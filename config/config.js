require('dotenv').config();

module.exports = {
    database_url: process.env.DATABASE_URL,
    jwt_secret: process.env.JWT_SECRET,
    do_space_key: process.env.DO_SPACE_KEY,
    do_secret_key: process.env.DO_SECRET_KEY,
    do_space_name: process.env.DO_SPACE_NAME,
    do_region: process.env.DO_REGION,
    PORT: 3000,
  };
  