const express =require('express');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader( "Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS");
    next();
})

app.post("/api/posts", (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get('/api/posts',(req, res, next)=>{
    const post =[
        {
          "id": 1,
          "title": "Introduction to JSON",
          "content": "JSON (JavaScript Object Notation) is a lightweight data-interchange format."
        },
        {
          "id": 2,
          "title": "Benefits of JSON",
          "content": "JSON is easy for humans to read and write. It is also easy for machines to parse and generate."
        },
        {
          "id": 3,
          "title": "JSON Syntax",
          "content": "JSON syntax is based on JavaScript object notation syntax, but it is not tied to JavaScript exclusively."
        },
        {
          "id": 4,
          "title": "Usage of JSON",
          "content": "JSON is commonly used for transmitting data in web applications (e.g., sending data from the server to the client, or vice versa)."
        },
        {
          "id": 5,
          "title": "Parsing JSON",
          "content": "In most programming languages, libraries exist to parse JSON into native data structures."
        }
      ]
      
    res.status(200).json({
        message:'post successful',
        post
    })
    next();
})


module.exports = app;