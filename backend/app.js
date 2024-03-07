const express =require('express');

const app = express();

// parse incoming requests
app.use((req, res, next)=>{
    console.log('first middle ware1',req.url);
    next();
})

app.use((req, res, next)=>{
res.send('hello from Express!')
//  res.end();
})


module.exports = app;