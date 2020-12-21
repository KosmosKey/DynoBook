const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./Passport");

app.use(
  cookieSession({
    name: "session",
    keys: [`${process.env.SESSION}`],
  })
);

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

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
