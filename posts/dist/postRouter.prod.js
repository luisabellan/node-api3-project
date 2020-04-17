"use strict";var express=require("express"),cors=require("cors"),posts=require("../posts/postDb"),router=express.Router();router.get("",function(t,e){posts.find().then(function(t){e.status(200).json(t)}).catch(function(t){return console.log(t),e.status(500).json({error:"The posts information could not be retrieved."})})}),router.get("/:id",function(t,e){posts.findById(t.params.id).then(function(t){return 0===t.length?e.status(404).json({message:"The post with the specified ID does not exist."}):e.status(200).json(t)}).catch(function(t){return console.log(t),e.status(500).json({error:"The post information could not be retrieved."})})}),router.delete("/:id",function(t,e){posts.findById(t.params.id).then(function(t){if(0===t.length)return e.status(404).json({message:"The post with the specified ID does not exist."})}),posts.remove(t.params.id).then(function(t){e.status(204).json()}).catch(function(t){e.status(500).json({error:"The post could not be removed"})})}),router.put("/:id",function(t,e){if(!t.body.title||!t.body.contents)return e.status(400).json({errorMessage:"Please provide title and contents for the post."})}),module.exports=router;