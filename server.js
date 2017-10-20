//// NODE JS PROJECT
//// Name: Y LIU 
//// Date: 10/19/2017



var fs = require('fs');

//Read in the data.json file
var read_in = fs.readFileSync('data.json'); 
var data = JSON.parse(read_in);
var db =[];                                 
db = data;                                  
//var length = Object.keys(db).length;

console.log('Server is starting');

//Create server port 3000
var express = require('express');                              
var app = express();
var server = app.listen(3000, listening);
function listening() {
	console.log("Server running at http://localhost:3000/");
}

app.get('/', function(request,response){
	response.send("NodeJS Project. Created by Y Liu, Evan Shelby and Nicholas Marston ");
});
//app.use(express.static('public'));                                  


//Routes

setTimeout(timer_add, 5000);
app.post('/temp', addData);
app.get('/temp', addData, retrieveAll);                            
app.get('/temp/latest', latest_submission);
app.get('/temp/highest', highest_submission);
app.get('/temp/lowest', lowest_submission);
app.get('/temp/average', avg_submission);
app.get('/temp/:device_id',find_id);
app.get('/temp/:device_id/latest', id_latest);
app.get('/temp/:device_id/highest', id_highest);
app.get('/temp/:device_id/lowest', id_lowest);
app.get('/temp/:device_id/average', id_avg);
app.get('/cel', toCel);



//Functions
//Add a new data every 4000ms with setTimeout
function timer_add() {
  var device = {};
  var id=Math.floor((Math.random() * 20) + 1);;
  device.device_id = id.toString();
  var time = new Date();
  device.timestamp = Math.floor(time.getTime()/1000);
  device.temperature = parseFloat(((Math.random()*51) + 50).toFixed(1));
  db.push(device);

  //Write the new data to the json file
  var text_device = JSON.stringify(device, null, 2);
  var new_device = JSON.stringify(db, null, 2);
  fs.writeFile('data.json', new_device, 'utf8', finished);
    function finished(err) {
    };      
    console.log("Added: "+ text_device);
    setTimeout(timer_add, 5000);
    
}


//Add a new value to a random device (by default, there are only 20 devices)
function addData(request, response, next) {
    var device = {};
    var id=Math.floor((Math.random() * 20) + 1);;
    device.device_id = id.toString();
    var time = new Date();
    device.timestamp = Math.floor(time.getTime()/1000);
    device.temperature = parseFloat(((Math.random()*51) + 50).toFixed(1));
    db.push(device);

    //Write the new data to the json file
    var new_device = JSON.stringify(db, null, 2);
    fs.writeFile('data.json', new_device, 'utf8', finished);
      function finished(err) {
      };      
      next();
}

//Retrieve all the value from the json array
function retrieveAll(request, response) { 
    response.send(db);	
}

//Retrieve the most recent submission
function latest_submission(request,response){
    response.send(db[db.length-1]);
}

//Retrieve the most highest temperature
function highest_submission(request,response){
  var max;
  for (var i =0; i<db.length; i++){
    if (!max || parseFloat(db[i].temperature) > parseFloat(max.temperature)){
      max = db[i];
    }
  }
  response.send(max);
}

//Retrieve the most lowest temperature
function lowest_submission(request,response){
  var min;
  for (var i =0; i<db.length; i++){
    if (!min || parseFloat(db[i].temperature) < parseFloat(min.temperature)){
    min = db[i];
    }
  }
  response.send(min);
}

//Find the average of the temperature
function avg_submission(request,response){
    var sum =0;
    var avg=0;
    for (var i =0; i<db.length; i++){
      sum = sum + parseFloat(db[i].temperature);
    }    
    avg=(sum/db.length).toFixed(1);
    response.send('The average submission is: '+ avg.toString());
}

//Get all the data from a specific device_id
function find_id(request,response){
    sensor = [];
    for (var i=0; i<db.length; i++){
      if (db[i].device_id === request.params.device_id){
        sensor.push({timestamp: db[i].timestamp, temperature: db[i].temperature})
      }
    }
    if (sensor.length === 0){
      response.send('ERROR 404 data not found')
    }
    else{
      response.send(sensor);
    }    
}

//Get the most recent submission from a specific device_id
function id_latest(request,response){
    sensor = [];
    for (var i = db.length-1; i> 0; i--){
      if (db[i].device_id === request.params.device_id){
        sensor.push({timestamp: db[i].timestamp, temperature: db[i].temperature});
        break;
      }    
    }
    if (sensor.length === 0){
      response.send('ERROR 404 data not found')
    }
    else{
      response.send(sensor);
    }
}


//Get the data of the highest temperature from a specific device
function id_highest(request,response){
    sensor = [];
    set = [];
    for (var i=0; i<db.length; i++){
      if (db[i].device_id === request.params.device_id){
        sensor.push(db[i]);
      }
    }
    if (sensor.length === 0){
      response.send('ERROR 404 data not found')
    }
    else{
      var max;
      for (var i =0; i<sensor.length; i++){
        if (!max || parseFloat(sensor[i].temperature) > parseFloat(max.temperature)){
          max = sensor[i];
          set = ({timestamp: sensor[i].timestamp, temperature: sensor[i].temperature})
        }
      }
      response.send(set);
    }
}

//Get the data of the lowest temperature from a specific device
function id_lowest(request,response){
  sensor = [];
  set = [];
  for (var i=0; i<db.length; i++){
    if (db[i].device_id === request.params.device_id){
      sensor.push(db[i]);
    }
  }
  if (sensor.length === 0){
    response.send('ERROR 404 data not found')
  }
  else{
    var min;
    for (var i =0; i<sensor.length; i++){
      if (!min || parseFloat(sensor[i].temperature) < parseFloat(min.temperature)){
        min = sensor[i];
        set = ({timestamp: sensor[i].timestamp, temperature: sensor[i].temperature})
      }
    }
    response.send(set);
  }
}

//Get the average temperature for a specific device
function id_avg(request,response){
  sensor = [];
  set = [];
  for (var i=0; i<db.length; i++){
    if (db[i].device_id === request.params.device_id){
      sensor.push(db[i]);
    }
  }
  if (sensor.length === 0){
    response.send('ERROR 404 data not found')
  }
  else{
    var sum=0;
    var avg=0;
    for (var i =0; i<sensor.length; i++){
      sum = sum + parseFloat(sensor[i].temperature);
    }    
    avg=(sum/sensor.length).toFixed(1);
    response.send('The average submission for this device is: '+ avg.toString());
  }
}

//Convert temperature from fahrenheit to celcius
function toCel(request, response){
  var sensor = [];
  for (var i =0; i<db.length; i++){
    db[i].temperature = parseFloat(((parseFloat(db[i].temperature)-32)*5/9).toFixed(1));
    sensor.push(db[i]);
  }
  response.send(sensor);
}