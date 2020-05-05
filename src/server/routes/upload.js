const express = require('express');
const router = express.Router();
const fs = require('fs')
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
var multer = require("multer");
const videos = require('../models/videos');
const User = require('../models/Users');

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


router.get('/',  ensureAuthenticated, (req, res) => res.render('uploadtest', {
user:req.user
  }));



var storage = multer.memoryStorage();
var upload = multer({storage: storage});



router.post('/', upload.single("videoFile"), (req, res) => {
  const file = req.file;
  var temp = JSON.parse(JSON.stringify(req.body));
  const desc = temp.description;
  console.log(desc);
    
    console.log(file);
    const user = req.user;
    
    console.log(desc);
    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });
    


    var params = {
        Bucket: '418videos',
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read"
      };

      s3.upload(params, function(s3Err, data) {
        if (s3Err) throw s3Err
        console.log(`File uploaded successfully at ${data.Location}`)
        const newVid = new videos({
            title: file.originalname,
            user: user.name,
            location: data.Location ,
            description: desc
        });
        newVid.save();
        res.redirect('/video/'+newVid._id);
    });
    

    
});

module.exports = router;