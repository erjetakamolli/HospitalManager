const mongoose = require('mongoose');
require('dotenv').config();

const dbUri = process.env.DB_URI;

mongoose.connect(dbUri)
  .then(() => console.log('Established a connection to the database'))
  .catch(err => console.log('Something went wrong when connecting to the database ', err));