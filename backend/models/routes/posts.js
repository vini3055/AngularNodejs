const express = require('express');

const router = express.Router();

const Post = require('../post');

router.get('/api/posts',(req, res, next)=>{
    // to get all the details from the db
        Post.find().then((document)=>{
          console.log('values from db ', document)
          res.status(200).json({
            message:'post successful',
           post:document
          })
        })
  })
  
  // posting the content for the api
  router.post("/api/posts", (req, res, next) => {
  // in order to post a new content inside the mongodb
      const post = new Post({
        title: req.body.title,
        content: req.body.content
      });
      post.save();
      console.log(post);
      res.status(201).json({
        message: 'Post added successfully'
      });
    });
  
    router.delete("/api/posts/:id",(req, res, next)=>{
      // delet the value based on the id
      Post.deleteOne({_id:req.params.id}).then(()=>{
      })
      res.status(200).json({message:'Post Deleted'})
    })
  
  router.put("/api/posts/:id", (req,res,next)=>{
    // update a specific card based on id
    const post = new Post({
      _id:req.params.id,
      title: req.body.title,
      content:req.body.content
    })
    Post.updateOne({_id:req.params.id}, post).then(()=>{
      res.status(200).json({
        message:"successfuly updated post value"
      })
    })
  })
  
  
  router.get("/api/posts/:id",(req,res,next)=>{
    // fetching data based on the specific id
    Post.findById(req.params.id).then(post=>{
      if(post){
        res.status(200).json(post)
      }else {
        res.status(404).json({message:"post not found"})
      }
    })
  })
  

  module.exports = router;