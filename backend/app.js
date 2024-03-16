const express =require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// all the apis /api/posts containing end points are saved in this path as postsRoutes
const postsRoutes = require('./models/routes/posts')

const app = express();
mongoose.connect("mongodb+srv://kvineethvini94:check121Cluster@cluster0.f3kzkay.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
  console.log('Connected MongoDb successfuly')
}).catch(()=>{
  console.log('mongodb is not connected')
})

app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader( "Access-Control-Allow-Methods","GET, POST,PUT, PATCH, DELETE, OPTIONS");
    next();
})

// added the apis in different folder for the better structure
// added api at the begining so that we can seperate end points with same at app.js itself
app.use('/api/posts',postsRoutes);

module.exports = app;