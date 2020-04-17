"use strict";

var express = require('express');

var server = express();
server.use(logger);
server.get('/', function (req, res) {
  res.send("<h2>Let's write some middleware!</h2>");
}); //custom middleware

function logger(req, res, next) {
  console.log("[".concat(new Date().toISOString(), "] ").concat(req.method, " to ").concat(req.url, " from ").concat(req.get('Origin')));
  next();
}

module.exports = server;