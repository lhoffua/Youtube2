const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const bodyParser = require('body-parser');
const fs = require('fs');
const AWS = require('aws-sdk');

const s3_access = require('../config/keys').AWS_ACCESS_KEY;
const s3_secret = require('../config/keys').AWS_SECRET_ACCESS_KEY;

router.get('/', (req, res) => res.render('uploadtest'));

const s3 = new AWS.S3({
    accessKeyId: s3_access,
    secretAccessKey: s3_secret
});

const fileName = 'ForBiggerBlazes.mp4';

const uploadFile = () => {
  fs.readFile(fileName, (err, data) => {
     if (err) throw err;
     const base64data = new Buffer(data, 'binary');
     const params = {
         Bucket: '418videos', // pass your bucket name
         Key: 'ForBiggerBlazes.mp4', // file will be saved as testBucket/contacts.csv
         Body: base64data,
         ContentType: 'mp4'
     };
     s3.upload(params, function(s3Err, data) {
         if (s3Err) throw s3Err
         console.log(`File uploaded successfully at ${data.Location}`)
     });
  });
};

router.post('/', (req, res) => {

    uploadFile();
});

module.exports = router;