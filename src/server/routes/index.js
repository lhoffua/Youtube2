const express = require('express');
const router = express.Router();
const path = require("path")
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


router.get('/', (req, res) => res.render('index'));
router.get('/search', (req, res) => res.render('searchpage'));
router.get('/profile', (req, res) => res.render('profile'));
router.get('/video', (req, res) => res.render('video'));


router.get('/test', ensureAuthenticated, (req, res) =>
  res.render('test' , { 
    root : "..", 
    user: req.user
  })
);

module.exports = router;