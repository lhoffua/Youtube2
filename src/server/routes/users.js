const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const bodyParser = require('body-parser');
const User = require('../models/Users');
const { forwardAuthenticated } = require('../config/auth');

router.use(express.static("../"));
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

router.get('/signIn', forwardAuthenticated, (req, res) => res.render('signIn'));


router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];
  
    if(!name || !email || !password || !password2){
      errors.push({ msg: 'Fill out all fields'});
    }

    if(password !== password2){
      errors.push({msg: 'Passwords do not match'});
    }

    if (errors.length > 0) {
      res.render('register', {
        errors,
        name,
        email,
        password,
        password2
      });
    }
    else{
    User.findOne({$or:[ {email: email}, {name : name }]}).then(user => {
        if (user) {
          errors.push({ msg: 'account already exists' });
          res.render('register', {
            errors,
            name,
            email,
            password,
            password2
          });
        } else {
          const newUser = new User({
            name,
            email,
            password,
            description: ""
        });
        
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  req.flash(
                    'succes_msg',
                    'You are now registered and can log in'
                  );
                  res.redirect('/users/signIn');
                })
                .catch(err => console.log(err));
            });
          });
        } 
    });
    }
});
    
router.post('/login', (req, res, next) => {
  console.log("body parsing", req.body);
    console.log("login info sent to server");
    passport.authenticate('local' ,
    {
      successRedirect: '/', 
      failureRedirect: '/users/signIn',
      failureFlash: true
    })(req, res, next);
  });

  router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/signIn');
  });

module.exports = router;