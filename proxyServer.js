var express = require('express');
var cors = require('cors');
const axios = require('axios');
const e = require('express');

var app = express();

app.use(cors());

const API_KEY = "RGAPI-70d12298-eff5-4924-8635-74a04dbe4314";

function getPlayerPUUID(playerName) {
    return axios.get("https://br1.api.riotgames.com" + "/lol/summoner/v4/summoners/by-name/" + playerName +"?api_key=" + API_KEY)
    .then(response => {
        console.log(response.data);
        return response.data.puuid 
    }).catch(err => err);
}


app.get('/past5Games', async (req, res) =>{
    const playerName = req.query.username;

    const PUUID = await getPlayerPUUID(playerName);
    const API_CALL = "https://americas.api.riotgames.com" + "/lol/match/v5/matches/by-puuid/" + PUUID + "/ids" +"?api_key=" + API_KEY

    const gameIDs = await axios.get(API_CALL)
        .then(response => response.data)
        .catch(err => err)
    console.log(gameIDs);

    var matchDataArray = [];
    for(var i = 0; i < gameIDs.length - 15; i++) {
        const matchID = gameIDs[i];
        const matchData = await axios.get("https://americas.api.riotgames.com/" + "lol/match/v5/matches/" + matchID + "?api_key=" + API_KEY)
            .then(response => response.data)
            .catch(err => err)
        matchDataArray.push(matchData);
    }


    res.json(matchDataArray);
});





app.listen(4000, function () {
    console.log("Server started")
});