const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./User");
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) return err;
      if (!user) return done(null, false);
      bcrypt.compare(password, user.password, (err, compare) => {
        if (err) return err;
        if (!compare) return done(null, false);
        if (compare) return done(null, user);
      });
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((user, done) => {
  User.findById(user, (err, user) => {
    if (err) return err;
    done(null, {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      image: user.image,
      username: user.username,
    });
  });
});
