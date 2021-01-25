const fetch = require('node-fetch');

let isLoggedIn = false;
let token;
let player;


function getAuthState() {
  return {
    isLoggedIn,
    token,
    username: player? player.username : '',
    player
  }
}

async function refreshToken(ApiAddress,token) {

	const data = await fetch( ApiAddress + '/refreshToken', {
		method: 'POST',
		headers:{
			'Accept': '*/*',
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': token 
		}
	})

	const res = await data.json()
	token = res.newToken

	return res
}

async function login(ApiAddress, body ) {
	const data = await fetch( ApiAddress + '/login/m', {
		method: 'POST',
		body: convertToParams( body ),
		headers:{
			'Accept': '*/*',
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
	
	const answerBody = await data.json()
	
  isLoggedIn = answerBody.ok
  console.log( isLoggedIn )
	token = answerBody.token
	player = await getPlayer(ApiAddress, token)

	return answerBody
}

function convertToParams( obj ){  
	const formData = new URLSearchParams();
	const objArr = Object.keys( obj ) 

	objArr.forEach( ( paramKey ) => {
		formData.append( paramKey, obj[ paramKey ]);
	})
 
	return formData
}

async function register(ApiAddress, body){
    const data = await fetch( ApiAddress + '/register', {
        method: 'POST',
        body: convertToParams( body ),
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
    
    const res = data.json()
    return res 
}

async function logout(ApiAddress)
{
  const data = await fetch(ApiAddress + '/logout',{
    method: 'POST',
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': token 
    }
  })

  isLoggedIn = false
  player = null
  token = null
  const res = data.json()
  console.log(res)
  return res
}
async function getPlayer(ApiAddress, token)
{
  const data = await fetch(ApiAddress + '/player',{
    method: 'GET',
    headers:{
      'Accept': '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': token 
    }
  })

  const res = await data.json()

  return res
}

module.exports = {
  	getAuthState,
    login,
    refreshToken,
    register,
    logout
}