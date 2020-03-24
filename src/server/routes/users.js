const express = require('express');
const router = express.Router();

router.get('/register', (req, res) => res.sendFile('register.html'));

router.get('/signIn', (req, res) => res.sendFile('signIn.html'));


module.exports = router;