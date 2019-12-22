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
    // Read the city from the user (request)
    // find the city in geo.json
    
    const locationData = require('./data/geo.json');
    let location = new Location("lynwood", locationData);
    response.status(200).send(location);
});

// function Weather(weatherData){
    //     this.forecast = weatherData.daily.data.summery; 
    //     this.time = weatherData.daily.data.time;
    //     WeatherArr.all.push(this);
    // }
    // server.get('/weather', (request, response) => {
        
        //     let arrLength =weatherData.daily.data.length;
        //     for (let i=0; i< arrLength ; i++){
            //         let timeValue = (new Date (weatherData.daily.data[i].time) * 1000).toString();
            //         let forecast = weatherData.daily.data[i].summery;
//         new Weather(timeValue);
//         new Weather(forecast);
//     }

//     const weatherData = require('./data/darksky.json');
//     response.status(200).send(WeatherArr.all);
//     console.log(WeatherArr.all)
// });

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
    let date = new Date(data[i].time * 1000).toString();
    let forecast = data[i].summary ;
    new Weather(date,forecast);


  }
  response.send(Weather.all)

})

server.use('*', (request, response) => {
	response.status(404).send('ALL I HAVE IS NEGATIVE THOUGHTS!!!');
});
server.use((error, request, response) => {
	response.send(500).send(error);
});


