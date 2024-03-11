const express =require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/posts')

const app = express();
mongoose.connect("mongodb+srv://kvineethvini94:check121Cluster@cluster0.f3kzkay.mongodb.net/node-angular?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
  console.log('Connected MongoDb successfuly')
}).catch(()=>{
  console.log('mongodb is not connected')
})

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader( "Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS");
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
  });

module.exports = app;