const express = require('express');
const router = express.Router();
const path = require("path");
const bodyParser = require('body-parser');
const ObjectID = require('mongodb').ObjectID;
const User = require('../models/Users');
const video = require('../models/videos');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.use(express.static("../"));
router.get('/', (req, res) => res.render('index', {
  user: req.user
}));
router.get('/search', (req, res) => res.render('searchpage',{
  user: req.user
})
);
router.get('/editprofile', ensureAuthenticated, (req, res) => {
  const name = req.user.name;
  video.find({user:name}, function(err, videos) {
    console.log(videos);
    console.log(req.user);
    res.render('profile' ,{
      user: req.user,
      Vresults:videos
    }) 
  });
});


router.get('/profile/:name', (req, res) =>{
  const name = req.params.name;
  User.findOne({name}, (err, result) =>{
    video.find({user:name}, function(err, videos) {
    console.log(result);
    console.log(req.user);
   res.render('public_profile',  {users:result, user: req.user, Vresults:videos});
  });
});
});


router.get('/video/:_id', (req, res) => {
  const _id = req.params._id;
  video.findById({_id}, (err, result) =>{
      res.render('video', {video:result});
  })
});


router.post('/editprofile', ensureAuthenticated, (req, res) => {
    const {description} = req.body;
    User.findOne({name:req.user.name}).then(user => {
      //this will give you the document what you want to update.. then 
      console.log("body parsing", req.body);
     
      user.updateOne({$set: {description}},
        (err) => {
          if (err) {
            throw err;
          }
        });
      
     res.redirect('/editprofile');
     });
     
});

router.post('/search', async (req, res) => {
  const {search} = req.body;
  let errors = [];
  console.log("body parsing", req.body);
  
  try{
  User.find({name: new RegExp(search, "i")}, function(err, users) {
    var userMap = {};
    video.find({title: new RegExp(search, "i")}, function(err, videos) {
    //users.forEach(function(user) {

      //userMap[user._id] = user;
   // });
   res.render('searchpage', {results:users, Vresults:videos, user:req.user, search:search});
  });
  
});
  }
  catch(err){
    errors.push({msg : "Search not found"})
    res.render('/',{errors});
  }
    //res.send(userMap);  
 
 
 
 
  });
    
module.exports = router;