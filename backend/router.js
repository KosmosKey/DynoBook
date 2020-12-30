const express = require("express");
const app = express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

app.post("/register", (req, res, next) => {
  const { first_name, last_name, username, password } = req.body;

  if (!first_name || !last_name || !username || !password)
    return res.status(400).send("You haven't filled out all the fields");
  User.findOne({ username: username }).then((user) => {
    if (user) return res.status(400).send("Sorry. The user already exists");
    bcrypt.hash(password, 10).then((hash) => {
      const newProfile = new User({
        username: username,
        first_name: first_name,
        last_name: last_name,
        password: hash,
      });

      newProfile.save().then((user) => {
        if (user) {
          return res.status(200).json({
            profile: {
              id: user.id,
              first_name: user.first_name,
              last_name: user.last_name,
              username: user.username,
            },

            message: "Congrats! You can now Log In with your user.",
          });
        }
      });
    });
  });
});

app.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("You haven't filled out all the fields");
  }

  User.findOne({ username: username }, (err, user) => {
    if (err) return err;
    if (!user) return res.status(400).send("We couldn't sign you in.");
    bcrypt.compare(password, user.password, (err, compare) => {
      if (err) return err;
      if (!compare) res.status(400).send("We couldn't sign you in.");
      else {
        const token = jwt.sign(
          {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            image: user.image,
            username: user.username,
          },
          `${process.env.JWT}`
        );
        res.send({ token });
      }
    });
  });
});

app.get("/", (req, res) => {
  const token = req.header("x-auth-bearer");
  if (!token) return res.status(400).send("Token not verified");
  const verify = jwt.verify(token, `${process.env.JWT}`);
  if (!verify) return res.status(400).send("Could not verify the token");
  res.send(verify);
});

app.post("/logout", (req, res) => {
  req.logOut();
  req.session = null;
  req.user = null;
  res.send("Logged out!");
});

module.exports = app;
