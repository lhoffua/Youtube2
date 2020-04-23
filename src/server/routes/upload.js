const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
require('dotenv').config();
const AWS = require('aws-sdk');
var multer = require("multer");
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get('/',  ensureAuthenticated, (req, res) => res.render('uploadtest'));




var storage = multer.memoryStorage();
var upload = multer({storage: storage});



router.post('/', upload.single("videoFile"), (req, res) => {
    const file = req.file;

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
        res.redirect('/profile');
    });
    

    
});

module.exports = router;