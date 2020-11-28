const express = require("express");
const app = express.Router();
const passport = require("passport");
const User = require("./User");
const bcrypt = require("bcryptjs");

app.post("/register", (req, res, next) => {
  const { first_name, last_name, email, username, password } = req.body;
  if (!first_name || !last_name || !email || !username || !password)
    return res.status(400).send("You haven't filled out all the fields");
  User.findOne({ username: username }).then((user) => {
    if (user) return res.status(400).send("Sorry. The user already exists");
    bcrypt.hash(password, 10).then((hash) => {
      const newProfile = new User({
        username: username,
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: hash,
      });

      newProfile.save().then((err, user) => {
        if (err) return res.status(400).send(err);
        if (user)
          return res
            .status(200)
            .send("Congrats! You can now go and Log In with your user.");
      });
    });
  });
});

app.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("You haven't filled out all the fields");
  }
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(400).send(err);
    if (!user)
      res.status(400).send("We couldn't sign you in. Please try again.");
    else {
      req.logIn(user, (err) => {
        res.send("You have successuly been authenticated");
      });
    }
  })(req, res, next);
});

module.exports = app;
