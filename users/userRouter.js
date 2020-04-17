const express = require("express");
const cors = require("cors");

const users = require("../users/userDb");
const router = express.Router();


function validatePost() {
  return (req, res, next) => {
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
  return (req, res, next) => {
    users
      .findById(req.params.id)
      .then((user) => {
        if (user) {
          // make the user object available to later middleware functions
          req.user = user;

          // middleware did what it set out to do,
          // (validated the user),
          // move on to the next piece of middleware.
          next();
        } else {
          // if you want to cancel the request from middleware,
          // just don't call next
          res.status(404).json({
            message: "invalid user id",
          });
        }
      })
      .catch((error) => {
        next(error);
      });
  };
}

function validateUser() {
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({
        message: "missing user data",
      });
    } else if (!req.body.name) {
      return res.status(400).json({
        message: "missing required name field",
      });
    }
    next();
  };
}


// This handles the route `GET /users`
router.get("/", (req, res) => {
  // these options are supported by the `users.get` method,
  // so we get them from the query string and pass them through.
  const options = {
    // query string names are CASE SENSITIVE,
    // so req.query.sortBy is NOT the same as req.query.sortby
    sortBy: req.query.sortBy,
    limit: req.query.limit,
  };

  users
    .get(options)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      // calling `next` with a parameter will skip down the middleware stack
      // to the error middleware defined in `index.js`. Any parameter that's
      // passed to next is considered an error. Calling `next()` without a
      // parameter will simply move to the next piece of middleware.
      next(error);
    });
});

// This handles the route `GET /users/:id`
router.get("/:id", validateUserId(), (req, res) => {
  res.status(200).json(req.user);
});

// This handles the route `POST /users`
router.post("/", validateUser(), (req, res) => {
  users
    .add(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      next(error);
    });
});

// This handles the route `PUT /users/:id`
router.put("/:id",  validateUserId(), (req, res) => {
  users
    .update(req.params.id, req.body)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      next(error);
    });
});

// This handles the route `DELETE /users/:id`
router.delete("/:id", validateUserId(), (req, res) => {
  users
    .remove(req.params.id)
    .then((count) => {
      res.status(200).json({
        message: "The user has been nuked",
      });
    })
    .catch((error) => {
      next(error);
    });
});

// Since posts in this case is a sub-resource of the user resource,
// include it as a sub-route. If you list all of a users posts, you
// don't want to see posts from another user.
router.get("/:id/posts", validateUserId(), (req, res) => {
  users
    .findUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      next(error);
    });
});

// Since we're now dealing with two IDs, a user ID and a post ID,
// we have to switch up the URL parameter names.
// id === user ID and postId === post ID
router.get("/:id/posts/:postId", validateUserId(), (req, res) => {
  users
    .findUserPostById(req.params.id, req.params.postId)
    .then((post) => {
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({
          message: "Post was not found",
        });
      }
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/:id/posts", validateUserId(),validatePost(), (req, res) => {
  if (!req.body.text) {
    // Make sure you have a return statement, otherwise the
    // function will continue running and you'll see ERR_HTTP_HEADERS_SENT
    return res.status(400).json({
      message: "Need a value for text",
    });
  }

  
  
});

module.exports = router;
