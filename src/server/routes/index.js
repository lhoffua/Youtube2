const express = require('express');
const router = express.Router();
const path = require("path")
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.use(express.static("../"));
router.get('/', (req, res) => res.render('index', {
  user: req.user
}));
router.get('/search', (req, res) => res.render('searchpage',{
  user: req.user
})
);
router.get('/profile', ensureAuthenticated, (req, res) => res.render('profile' ,{
  user: req.user
})
);
router.get('/video', (req, res) => res.render('video',{
  user: req.user
})
);


router.get('/test', ensureAuthenticated, (req, res) =>
  res.render('test' , { 
    root : "..", 
    user: req.user
  })
);

module.exports = router;