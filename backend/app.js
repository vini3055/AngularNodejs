const express =require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/posts');
const { CONSOLE_APPENDER } = require('karma/lib/constants');

const app = express();
mongoose.connect("mongodb+srv://kvineethvini94:check121Cluster@cluster0.f3kzkay.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
  console.log('Connected MongoDb successfuly')
}).catch(()=>{
  console.log('mongodb is not connected')
})

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader( "Access-Control-Allow-Methods","GET, POST,PUT, PATCH, DELETE, OPTIONS");
    next();
})



app.get('/api/posts',(req, res, next)=>{
      Post.find().then((document)=>{
        console.log('values from db ', document)
        res.status(200).json({
          message:'post successful',
         post:document
        })
      })
    // next();
})

// posting the content for the api
app.post("/api/posts", (req, res, next) => {
    // const post = req.body;
    const post = new Post({
      title: req.body.title,
      content: req.body.content
    });
    post.save();
    console.log(post);
    res.status(201).json({
      message: 'Post added successfully'
    });
    // next();
  });

  app.delete("/api/posts/:id",(req, res, next)=>{
    console.log('request param',req.params.id)
    // console.log('post list', post)
    // console.log(Post.find((items)=>items.id !==req.params.id))
    // Post.findOneAndDelete({_id:req.params.id});
    Post.deleteOne({_id:req.params.id}).then((result)=>{
      console.log('results ', result);
    })
    // console.log('post',Post.find())
    res.status(200).json({message:'Post Deleted'})
  })

app.put("/api/posts/:id", (req,res,next)=>{
  const post = new Post({
    _id:req.params.id,
    title: req.body.title,
    content:req.body.content
  })
  Post.updateOne({_id:req.params.id}, post).then(successfull=>{
    console.log('post update successful', successfull)
    res.status(200).json({
      message:"successfuly updated post value"
    })
  })
})


module.exports = app;