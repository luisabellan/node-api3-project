"use strict";

var express = require("express");

var cors = require("cors");

var users = require("../users/userDb");

var router = express.Router();

function validatePost() {
  return function (req, res, next) {
    if (!req.body) {
      return res.status(400).json({
        message: "missing post data"
      });
    }

    if (!req.body.text) {
      return res.status(400).json({
        message: "missing required text field"
      });
    }
  };
}

function validateUserId() {
  return function (req, res, next) {
    users.findById(req.params.id).then(function (user) {
      if (user) {
        // make the user object available to later middleware functions
        req.user = user; // middleware did what it set out to do,
        // (validated the user),
        // move on to the next piece of middleware.

        next();
      } else {
        // if you want to cancel the request from middleware,
        // just don't call next
        res.status(404).json({
          message: "invalid user id"
        });
      }
    })["catch"](function (error) {
      next(error);
    });
  };
}

function validateUser() {
  return function (req, res, next) {
    if (!req.body) {
      return res.status(400).json({
        message: "missing user data"
      });
    } else if (!req.body.name) {
      return res.status(400).json({
        message: "missing required name field"
      });
    }

    next();
  };
} // This handles the route `GET /users`


router.get("/", function (req, res) {
  // these options are supported by the `users.get` method,
  // so we get them from the query string and pass them through.
  var options = {
    // query string names are CASE SENSITIVE,
    // so req.query.sortBy is NOT the same as req.query.sortby
    sortBy: req.query.sortBy,
    limit: req.query.limit
  };
  users.get(options).then(function (users) {
    res.status(200).json(users);
  })["catch"](function (error) {
    // calling `next` with a parameter will skip down the middleware stack
    // to the error middleware defined in `index.js`. Any parameter that's
    // passed to next is considered an error. Calling `next()` without a
    // parameter will simply move to the next piece of middleware.
    next(error);
  });
}); // This handles the route `GET /users/:id`

router.get("/:id", validateUserId(), function (req, res) {
  res.status(200).json(req.user);
}); // This handles the route `POST /users`

router.post("/", validateUser(), function (req, res) {
  users.add(req.body).then(function (user) {
    res.status(201).json(user);
  })["catch"](function (error) {
    next(error);
  });
}); // This handles the route `PUT /users/:id`

router.put("/:id", validateUserId(), function (req, res) {
  users.update(req.params.id, req.body).then(function (user) {
    res.status(200).json(user);
  })["catch"](function (error) {
    next(error);
  });
}); // This handles the route `DELETE /users/:id`

router["delete"]("/:id", validateUserId(), function (req, res) {
  users.remove(req.params.id).then(function (count) {
    res.status(200).json({
      message: "The user has been nuked"
    });
  })["catch"](function (error) {
    next(error);
  });
}); // Since posts in this case is a sub-resource of the user resource,
// include it as a sub-route. If you list all of a users posts, you
// don't want to see posts from another user.

router.get("/:id/posts", validateUserId(), function (req, res) {
  users.findUserPosts(req.params.id).then(function (posts) {
    res.status(200).json(posts);
  })["catch"](function (error) {
    next(error);
  });
}); // Since we're now dealing with two IDs, a user ID and a post ID,
// we have to switch up the URL parameter names.
// id === user ID and postId === post ID

router.get("/:id/posts/:postId", validateUserId(), function (req, res) {
  users.findUserPostById(req.params.id, req.params.postId).then(function (post) {
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({
        message: "Post was not found"
      });
    }
  })["catch"](function (error) {
    next(error);
  });
});
router.post("/:id/posts", validateUserId(), validatePost(), function (req, res) {
  if (!req.body.text) {
    // Make sure you have a return statement, otherwise the
    // function will continue running and you'll see ERR_HTTP_HEADERS_SENT
    return res.status(400).json({
      message: "Need a value for text"
    });
  }
});
module.exports = router;