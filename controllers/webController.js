const fetch = require('node-fetch');
const { getAuthState } = require('./authController')

async function getPlayerStats( apiAddress )
{
  const data = await fetch(apiAddress + '/stat',{
    method: 'GET',
    headers:{
      'Accept': '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': getAuthState().token 
    }
  })
  
  const temp = await data.json()
  playerStats = temp
  
  return playerStats
}

module.exports = {
    getPlayerStats,
}