const express=require('express');
const axios = require('axios');
const cors= require('cors');


const app= express();

app.use(cors({origin: 'http://localhost:3000'}));

app.get('src/components/NflInfo.js', (req,res)=>{
axios
   .get('https://sportsdata.io/developers/api-documentation/nfl#/free/player-details-by-player')
   .then(resultsSportsIO =>res.send(resultsSportsIO.data));
});
app.get('/', (req,res =>{
    axios
      .get('https://www.fantasyfootballnerd.com/service/schedule/xml/bbhy7d753d7a/')
      .then(resultsNFL =>res.send(resultsNFL.data));
}));
app.get('src/components/NflInfo.js', (req,res, next =>{
   axios
      .get('https://www.fantasyfootballnerd.com/service/schedule/xml/bbhy7d753d7a/')
      .then(resultsNFL =>res.send(resultsNFL.data));
}));
app.get('src/components/NflInfo.js', (req,res)=>{
   axios
      .get('https://sportsdata.io/developers/api-documentation/nfl#/free/player-details-by-player')
      .then(resultsNFL =>res.send(resultsNFL.data));
});

module.exports =app;