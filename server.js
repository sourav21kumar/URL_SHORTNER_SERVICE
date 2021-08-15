const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
// const path = require('path');
const url = require('./models/shortURL');

mongoose.connect('mongodb://localhost/urlshortner',{useNewUrlParser:true,useUnifiedTopology:true});
const port = 5000;

const app = express();
app.set('view engine','ejs'); //for setting the view engine to ejs
app.use('/public', express.static('public'));

app.use(express.urlencoded({extended:false}));
// ROUTES
app.get('/',async(req,res)=>{
   const shorturls = await url.find();
   res.status(200).render('index',{shorturls:shorturls});

});

app.post('/short',async(req,res)=>{
     
     await url.create({full:req.body.fullURL})
     res.redirect('/');
});

// FOR THE SHORT URL TO REDIRECT TO THE FULL URL
app.get('/:shortUrl',async(req,res)=>{
    
  const shortUrl = await url.findOne({short: req.params.shortUrl});


if(shortUrl==null)
{
   return res.sendStatus(404);
}
shortUrl.clicks++
shortUrl.save();
res.redirect(shortUrl.full)
});
app.listen(port,()=>{
   console.log(`SERVER LISTENING AT ${port}`);
});