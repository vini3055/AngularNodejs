const express =require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



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
app.use(postsRoutes);


module.exports = app;