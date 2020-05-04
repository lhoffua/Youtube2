const express = require('express');
const router = express.Router();
const path = require("path");
const bodyParser = require('body-parser');
const ObjectID = require('mongodb').ObjectID;
const User = require('../models/Users');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.use(express.static("../"));
router.get('/', (req, res) => res.render('index', {
  user: req.user
}));
router.get('/search', (req, res) => res.render('searchpage',{
  user: req.user
})
);
router.get('/editprofile', ensureAuthenticated, (req, res) => res.render('profile' ,{
  user: req.user
})
);
router.get('/profile/:name', (req, res, next) =>{
  const name = req.params.name;
  User.findOne({name}, (err, result) =>{
    
    console.log(result);
    console.log(req.user);
   res.render('public_profile',  {users:result, user: req.user});
  });
});
router.get('/video', (req, res) => res.render('video',{
  user: req.user
})
);

router.post('/editprofile', ensureAuthenticated, (req, res) => {
    const {description} = req.body;
    User.findOne({name:req.user.name}).then(user => {
      //this will give you the document what you want to update.. then 
      console.log("body parsing", req.body);
      console.log(description.description);
      user.updateOne({$set: {description}},
        (err) => {
          if (err) {
            throw err;
          }
        });
      
     res.redirect('/editprofile');
     });
     
});

router.get('/test', ensureAuthenticated, (req, res) =>
  res.render('test' , { 
    root : "..", 
    user: req.user
  })
);




module.exports = router;