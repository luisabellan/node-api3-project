"use strict";

var express = require('express');

var cors = require("cors");

var posts = require("../posts/postDb");

var router = express.Router();
router.get('/', function (req, res) {// do your magic!
});
router.get('/:id', function (req, res) {// do your magic!
});
router["delete"]('/:id', function (req, res) {// do your magic!
});
router.put('/:id', function (req, res) {// do your magic!
}); // custom middleware

function validatePostId(req, res, next) {// do your magic!
}

module.exports = router;