const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
let db;
if (process.env.ENV === 'Test') {
  console.log('This is the test environment');

  db = mongoose.connect('mongodb://localhost/bookAPI_test');
} else {
  console.log('This is the product environment');
  db = mongoose.connect('mongodb://localhost/bookAPI');
}

const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my Nodemon API!');
});

app.server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = app;
