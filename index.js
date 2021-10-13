/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const mainRouter = require('./src/routes');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger('dev'));

app.use(express.static('public'));

app.use(mainRouter);

app.listen(port, () => {
  console.log(`App started at port ${port}`);
});
