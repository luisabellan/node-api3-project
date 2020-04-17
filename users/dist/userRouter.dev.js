"use strict";

var express = require("express"); //const cors = require("cors");


var users = require("../users/userDb");

var router = express.Router();
router.post('/', function (req, res) {// do your magic!
});
router.post('/:id/posts', function (req, res) {// do your magic!
});
router.get('/', function (req, res) {// do your magic!
});
router.get('/:id', function (req, res) {// do your magic!
});
router.get('/:id/posts', function (req, res) {// do your magic!
});
router["delete"]('/:id', function (req, res) {// do your magic!
});
router.put('/:id', function (req, res) {// do your magic!
}); //custom middleware

function validateUserId(req, res, next) {// do your magic!
}

function validateUser(req, res, next) {// do your magic!
}

function validatePost(req, res, next) {// do your magic!
}

module.exports = router;