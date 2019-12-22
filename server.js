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

// function Weather(city, weatherData){

// }


server.use('*', (request, response) => {
	response.status(404).send('ALL I HAVE IS NEGATIVE THOUGHTS!!!');
});
server.use((error, request, response) => {
	response.send(500).send(error);
});


