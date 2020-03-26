const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// Load User model
const User = require('../models/Users');

module.exports = function(passport) {
  passport.use(
   
    new LocalStrategy({ usernameField: 'name' }, (name, password, done) => {
      // Match user
      console.log("PASSPORT BEING USED");
      User.findOne({
        name: name
      }).then(user => {
        console.log("user found");
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          console.log('decrypting password');
          if (err) throw err;
          if (isMatch) {
            console.log("password match");
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};