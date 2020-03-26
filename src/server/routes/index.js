const express = require('express');
const router = express.Router();
const path = require("path")
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.use(express.static("../"));
router.get('/', (req, res) => res.sendFile('/index.html' , { root : ".."}));

router.get('/test', ensureAuthenticated, (req, res) =>
  res.render('test' , { 
    root : "..", 
    user: req.user
  })
);

module.exports = router;