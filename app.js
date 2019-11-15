'use strict';

// [START gae_node_request_example]
const express = require('express');
const app = express();
let url = require('url')

//setup some global variables to get it rollin
var count = Number(0)
var mean = Number(0)//var instead of mean... might fix somethin
var max = Number(0)
var min = Number(10000)
var total = Number(0)

app.get('/', (req, res) => {
  res
    .status(200)
    .send('add /statistics to see some stats')
    .end();
});
//make a funky boi in particle to trigger this
app.get('/addData', (req, res) => {
  //get the heartrate
  var data = req.query.heartRate
  var rate = Number(data)
  
  //is it min
  if (rate < min) {
    min = rate
  }
  //is it max
  if (rate > max) {
    max = rate
  }
  //add to avg
  total = total + rate //this line just appends rate to total? ie, 50 and 50 is 5050
  count = count + 1
  mean = total / count

  res
    .status(200)
    .send('heart rate data recieved')
    .end();
});

//so what I need to do in here is change the source code to be a github repo that I can change locally 

app.get('/statistics', (req, res) => {
  res
    .status(200)
    .send('mean: ' + mean + ' min: ' + min + ' max: ' + max)
    .end()
});


// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]

module.exports = app;
