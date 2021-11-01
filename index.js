/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const corsDependencies = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');

const mainRouter = require('./src/routes');

const app = express();
const port = process.env.PORT || 8000;
const cors = {
  origin: '*',
}
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors,
});

app.use(corsDependencies());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger('dev'));

app.use(express.static('public'));

app.use(mainRouter);

io.on("connection", (socket) => {
  console.log("Socket connected on", socket.id);
});

httpServer.listen(port, () => {
  console.log(`App started at port ${port}`);
});

const exportSocket = io;
module.exports.ioObject = exportSocket;