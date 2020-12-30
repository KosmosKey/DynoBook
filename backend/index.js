const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use("/dyno", require("./router"));

mongoose
  .connect(`${process.env.MONGODB}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MonogDB Is Successfully Connected..."))
  .catch(() => console.log("Failed To Connect MongoDB"));

app.listen(PORT, () => console.log(`The port is running on ${PORT}`));
