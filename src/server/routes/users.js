const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const bodyParser = require('body-parser');
const User = require('../models/Users');
const { forwardAuthenticated } = require('../config/auth');

router.use(express.static("../"));
router.get('/register', forwardAuthenticated, (req, res) => res.sendFile('/register.html' , { root : ".."}));

router.get('/signIn', forwardAuthenticated, (req, res) => res.sendFile('/signIn.html'  , { root : ".."}));

router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;

    User.findOne({ email: email }).then(user => {
        if (user) {
          console.log({ msg: 'Email already exists' });
        } else {
          const newUser = new User({
            name,
            email,
            password
        });
        
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                  console.log(
                    'success_msg',
                    'You are now registered and can log in'
                  );
                  res.redirect('/users/signIn');
                })
                .catch(err => console.log(err));
            });
          });
        } 
    });
});
    
router.post('/login', bodyParser.json(), (req, res, next) => {
    console.log("login info sent to server");
    passport.authenticate('local', function(err, user, info){
      console.log(err);
      console.log(user);
      console.log(info);      /*successRedirect: '/test',
      failureRedirect: console.log("fail"),
      failureFlash: true*/
    })(req, res, next);
  });

  router.get('/logout', (req, res) => {
    req.logout();
    console.log('You are logged out');
    res.redirect('/users/signIn');
  });

module.exports = router;