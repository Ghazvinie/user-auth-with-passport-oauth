const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

// Express app
const app = express();

// Passport config
require('./config/passport')(passport);

// Connect to DB and server listen
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    console.log('Connected to the database...');
    app.listen(3000, () => console.log('Server is listening on port 3000...'));
  })
  .catch(error => console.log('Database connection error' + error));

// Express session
app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Set view engine
app.set('views', './public/views');
app.set('view engine', 'ejs');

  app.get('/', (req, res) => {
      res.send('Home');
  }); 
