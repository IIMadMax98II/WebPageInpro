const express = require("express");
const app = express();
const {getPlayerStats} = require('./controllers/webController'); 
const { getAuthState, refreshToken, login, register, logout } = require('./controllers/authController');
// const webController = require('./controllers/webController'); 
// const getPlayerStats = webController.getPlayerStats

//const ApiAddress = 'http://localhost:3333'
const ApiAddress = 'http://triaedapi.btshub.lu'

//With this we can convert our bodies to params
const url = require('url');
const URLSearchParams = url.URLSearchParams



app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'))

// middleware to extract body params in html form tag
app.use(express.urlencoded({
  extended: true
}))


let playerStats;

app.get('/', async (req, res)=>{
  if (getAuthState().isLoggedIn)
  {
    await refreshToken(ApiAddress)
  }

  res.render('home',{
    title: 'Homepage',
    isLoggedIn: getAuthState().isLoggedIn,
    username: getAuthState().username
  })
})

app.get('/login-page', (req, res)=>{
  
  res.render('login-page',{
    title: 'Login Page',
    isLoggedIn: getAuthState().isLoggedIn,
    username: getAuthState().username
  })
})

app.post('/login',async (req, res)=>{
 
  const answer = await login(ApiAddress,req.body)

  if( !getAuthState().isLoggedIn) {
    
    res.render('auth-error', {
      title: 'Login Error',
      reason: answer.error,
      isLoggedIn: getAuthState().isLoggedIn,
      username: getAuthState().username
    })
  }
  else {

    res.render('home', {
      title: 'Homepage',
      isLoggedIn: getAuthState().isLoggedIn,
      username: getAuthState().username
    })
   
  }
})

app.post('/logout',async (req,res)=>{
  
  const answer = await logout(ApiAddress)
  console.log('--------------->',answer)

  if( answer.ok) {
    
    res.render('home', {
      title: 'Homepage',
      isLoggedIn: getAuthState().isLoggedIn,
      username: getAuthState().username
    })
  }
})

app.get('/glossary-page',async (req,res)=>{
  
  if (getAuthState().isLoggedIn)
  {
    await refreshToken(ApiAddress)
  }
  
  res.render('glossary-page',{
    title: 'Glossary',
    isLoggedIn: getAuthState().isLoggedIn,
    username: getAuthState().username
  })
})

app.get('/settings',async (req,res)=>{
  
  if (getAuthState().isLoggedIn)
  {
    await refreshToken(ApiAddress)
  }
  
  res.render('settings',{
    title: 'Settings Page',
    isLoggedIn: getAuthState().isLoggedIn,
    player:getAuthState().player
  })
})

app.get('/social',async (req,res)=>{
  
  if (getAuthState().isLoggedIn)
  {
    await refreshToken(ApiAddress)
    playerStats = await getPlayerStats( ApiAddress)
  }
  

  res.render('social',{
    title: 'Social/Stats Page',
    isLoggedIn: getAuthState().isLoggedIn,
    username: getAuthState().username,
    playerStats: playerStats
  })
})

app.get('/news',async (req,res)=>{
  
  if (getAuthState().isLoggedIn)
  {
    await refreshToken(ApiAddress)
  }
  
  res.render('news',{
    title: 'News Page',
    isLoggedIn: getAuthState().isLoggedIn,
    username: getAuthState().username
  })
})

app.get('/register-page',(req,res)=>{
  
  res.render('register-page',{
    title: 'Registration Page',
    isLoggedIn: getAuthState().isLoggedIn,
    username: getAuthState().username
  })
})

app.post('/register',async (req, res)=>{

  answerBody = await register(ApiAddress, req.body)
      
  if( !answerBody.ok ) {
    res.render('auth-error', {
      title: 'Login Error',
      reason: answerBody.error
    })
  }
  else {

    await login(ApiAddress,req.body)
      
    res.render('home',{
      title: 'Homepage',
      isLoggedIn: getAuthState().isLoggedIn,
      username: getAuthState().username
    })
    
  }
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.info('Rest server listening on port ' + PORT );
});
