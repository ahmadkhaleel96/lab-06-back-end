'use strict';

const express = require('express');
const server = express();

const cors = require('cors');
server.use(cors());

require('dotenv').config();
const PORT = process.env.PORT;

server.listen(PORT, () => console.log('Listening to PORT 5500'));

server.get('/', (request, response) => {
    response.status(200).send('YOU ARE MEAN!!!');
});

function Location(city, locationData){
    this.formatted_query = locationData[0].display_name;
    this.latitude = locationData[0].lat;
    this.longitude = locationData[0].lon;
    this.search_query = city;
}
server.get('/location', (request, response) => {
    
    const locationData = require('./data/geo.json');
    let location = new Location("lynwood", locationData);
    response.status(200).send(location);
});

function Weather(summary,time){
    this.forecast = summary,
    this.time = time;
    Weather.all.push(this)
}

Weather.all = [];

server.get('/weather',(request,response)=> {

    const weatherData = require('./data/darksky.json') ;
  let data = weatherData.daily.data;
  
  for(let i=0;i<data.length;i++){
    let date = new Date(data[i].time * 1000).toDateString();
    let forecast = data[i].summary ;
    new Weather(date,forecast);


  }
  response.send(Weather.all)
  Weather.all=[]

})

server.use('*', (request, response) => {
	response.status(404).send('ALL I HAVE IS NEGATIVE THOUGHTS!!!');
});
server.use((error, request, response) => {
	response.send(500).send(error);
});


