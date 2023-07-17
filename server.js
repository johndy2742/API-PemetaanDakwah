const config = require('./config/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require('./routes/routes');
const passport = require('passport');
const passportMiddleware = require('./middlewares/authenticators');


mongoose.connect(config.database_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));


app.use(passport.initialize());
passport.use(passportMiddleware);

app.use(express.json());
app.use(router);

const port = config.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
