const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
const AWS = require('aws-sdk');
var multer = require("multer");
const s3_access = require('../config/keys').AWS_ACCESS_KEY;
const s3_secret = require('../config/keys').AWS_SECRET_ACCESS_KEY;

router.get('/', (req, res) => res.render('uploadtest'));




var storage = multer.memoryStorage();
var upload = multer({storage: storage});



router.post('/', upload.single("videoFile"), (req, res) => {
    const file = req.file;

    const s3 = new AWS.S3({
        accessKeyId: s3_access,
        secretAccessKey: s3_secret
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
    });
    

    
});

module.exports = router;