const express =require('express');

const app = express();

// // parse incoming requests
// app.use((req, res, next)=>{
//     console.log('first middle ware1',req.url);
//     next();
// })

// app.use((req, res, next)=>{
// res.send('hello from Express!')
// //  res.end();
// })

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Header","Origin,X-Request-With,COntent-Type,Accept");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,DELETE,OPTIONS");
    next();

})


app.use('/api/posts',(req, res, next)=>{
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
})

module.exports = app;