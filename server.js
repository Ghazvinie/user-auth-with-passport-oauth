const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');


// Express app
const app = express();

// Connect to DB and server listen
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    console.log('Connected to the database...');
    app.listen(3000, () => console.log('Server is listening on port 3000...'));
  })
  .catch(error => console.log('Database connection error' + error));

  app.get('/', (req, res) => {
      res.send('Home');
  });