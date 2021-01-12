const express = require("express");
const app = express();
const fetch = require('node-fetch')

const ApiAddress = 'http://localhost:3333'
// const ApiAddress = 'http://192.168.128.91:3333'

let currentUser = null

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'))

// middleware to extract body params in html form tag
app.use(express.urlencoded({
  extended: true
}))

app.get('/', (req, res)=>{
  res.render('home',{
    title: 'Homepage',
    currentUser: currentUser
  })
})

app.get('/login-page', (req, res)=>{
  res.render('login-page',{
    title: 'Login Page',
    currentUser: 'currentUser'
  })
})

app.post('/login',(req, res)=>{
  console.log('-------pase por aqui', req.body)

  fetch( ApiAddress + '/login/m', {
    method: 'POST',
    body: res.body
  }).then( data =>{
    data.json().then( answerBody => {
      console.log( answerBody )
      if( !answerBody.ok ) {
        //currentUser = 'Testing User'
        res.render('auth-error', {
          title: 'Login Error',
          reason: answerBody.message
        })
      }
      else {
        currentUser = answerBody.email
        res.render('home')
      }
    })
  })
})

app.get('/glossary',(req,res)=>{
  app.render('glossary',{
    title: 'Glossary'
  })
})

app.get('/settings',(req,res)=>{
  res.render('settings',{
    title: 'Settings Page',
    currentUser: currentUser  })
})

app.get('/social',(req,res)=>{
  res.render('social',{
    title: 'Social/Stats Page',
    currentUser: currentUser
  })
})

app.get('/news',(req,res)=>{
  res.render('news',{
    title: 'News Page'
  })
})

app.get('/register-page',(req,res)=>{
  res.render('register-page',{
    title: 'Registration Page'
  })
})

app.post('/register',(req, res)=>{
  console.log('Registering User', req.body)

  fetch( ApiAddress + '/register', {
    method: 'POST',
    body: res.body
  }).then( data =>{
    data.json().then( answerBody => {
      console.log( answerBody )
      if( !answerBody.ok ) {
        res.render('auth-error', {
          title: 'Login Error',
          reason: answerBody.errors
        })
      }
      else {
        currentUser = answerBody.email
        res.render('home')
      }
    })
  })
})

app.listen( 3000, ()=>{
  console.log( 'Connect2')
})
