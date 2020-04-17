"use strict";

var express = require("express");

var cors = require("cors"); // const morgan = require("morgan")


var logger = require("./middleware/logger");

var postRouter = require('./posts/postRouter');

var userRouter = require('./users/userRouter');

var server = express();
var port = 4000;
server.use(express.json());
server.use(cors());
server.use(logger({
  format: "long"
}));
var router = express.Router();
server.use('/users', userRouter);
server.use('/posts', postRouter); // this middleware function will only run if no route is found.
// routes never call `next()`, so if a route is found, this never runs.

server.use(function (req, res) {
  res.status(404).json({
    message: "Route was not found"
  });
});
server.listen(port, function () {
  console.log("Server running at http://localhost:".concat(port));
});