const express = require("express");
const app = express();
// mongoose = require('mongoose');

// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/Authentication'); 

// const routes = require('./api/routes/playerRoutes'); //importing route
// routes(app); //register the route

app.set('view engine', 'pug');

app.get('/', (req, res)=>{
  res.render('home',{
    title: 'Homepage',
    // people: people.profiles
  })
})

app.get('/login', (req, res)=>{
  res.render('login',{
    title: 'Login Page',
    // people: people.profiles
  })
})

app.get('/config',(req,res)=>{
  res.render('config',{
    title: 'Configure Page'
  })
})

app.get('/social',(req,res)=>{
  res.render('social',{
    title: 'Social/Stats Page'
  })
})

app.listen( 3000, ()=>{
  console.log( 'Connect2')
})
