const express = require("express");
const app = express.Router();
const passport = require("passport");
const User = require("./User");
const bcrypt = require("bcryptjs");

app.post("/register", (req, res, next) => {
  const { first_name, last_name, email, username, password, image } = req.body;
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
        image: image,
        password: hash,
      });

      newProfile.save().then((user) => {
        if (user) {
          return res.status(200).json({
            id: user.id,
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

app.get("/", (req, res) => {
  if (!req.user) {
    res.status(400).send("no user");
  } else {
    res.status(200).send(req.user);
  }
});

app.post("/logout", (req, res) => {
  req.logOut();
  req.session = null;
  req.user = null;
  res.send("Logged out!");
});

module.exports = app;
