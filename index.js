require("dotenv").config();
const express = require("express");
const logger = require("morgan");


const mainRouter = require("./src/routes");
const app = express();
const port = 8000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger("dev"));

app.use(mainRouter);

app.listen(port, () => {
  console.log(`App started at port ${port}`);
});

