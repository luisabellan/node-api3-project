const express = require("express");
const cors = require("cors");

const router = express.Router();
const posts = require("../posts/postDb");
const users = require("../users/userDb");

function validateUserId() {
  return (req, res, next) => {
    users
      .getById(req.params.id)
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

function validatePost() {
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({
        message: "missing post data",
      });
    }

    if (!req.body.message) {
      return res.status(400).json({
        message: "missing required text field",
      });
    }
  };
}
/* 
router.post("", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  }

  posts
    .insert(req.body)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        error: "There was an error while saving the post to the database",
      });
    });
});

router.post("/:id/comments", (req, res) => {
  console.log(req.params.id);
  const postId = req.params.id;
  req.body.post_id = postId;

  if (!req.body.text) {
    return res.status(400).json({
      errorMessage: "Please provide text for the comment.",
    });
  }
  const postComment = posts.findPostComments(req.body.post_id);

  if (postComment.length === 0) {
    return res.status(404).json({
      message: "The post with the specified ID does not exist.",
    });
  }
  try {
    posts
      .insertComment(req.body)

      .then((comment) => {
        return res.status(201).json(comment);
      })
      .catch((error) => {
        //console.log(error);
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "There was an error while saving the comment to the database",
    });
  }
});
 */

router.get("", (req, res) => {
  posts
    .get()

    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        error: "The posts information could not be retrieved.",
      });
    });
});

router.get("/:id", validateUserId(), (req, res) => {
  //console.log(posts)
  posts
    .getById(req.params.id)
    .then((post) => {
      //console.log(typeof(post));
      if (!post) {
        return res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      }

      return res.status(200).json(post);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        error: "The post information could not be retrieved.",
      });
    });
});

/* router.get("/:id/comments", (req, res) => {
  posts
    .findCommentById(req.params.id)
    .then((post) => {
      // console.log(post);
      if (post.length === 0) {
        return res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      }

      return res.status(200).json(post);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        error: "The comments information could not be retrieved.",
      });
    });
}); */
// This handles the route `DELETE /users/:id`
router.delete("/:id", validateUserId(), (req, res) => {
	users.remove(req.params.id)
		.then((count) => {
			res.status(200).json({
				message: "The user has been deleted",
			})
		})
		.catch((error) => {
			next(error)
		})
})

router.put("/:id", validateUserId(), (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  }

  /*  posts
    .findById(req.params.id)
    .then((post) => {
      if (post.length === 0) {
        return res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });

  posts
    .update(req.params.id, req.body)
    .then((post) => {
      console.log(res);

      return res.status(200).json(post);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        error: "The post information could not be modified.",
      });
    });*/
});
module.exports = router;
