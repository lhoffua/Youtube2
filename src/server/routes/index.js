const express = require('express');
const router = express.Router();
const path = require("path")

router.use(express.static("../"));
router.get('/', (req, res) => res.sendFile('/index.html' , { root : ".."}));

module.exports = router;