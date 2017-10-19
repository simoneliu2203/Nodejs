var fs = require('fs');
var read_in = fs.readFileSync('data.json'); //Read in the data.json file
var data = JSON.parse(read_in);
var db =[];                                 //Create empty array
db = data;                                  //Pass data from data.json to db array
var length = Object.keys(db).length+1;

console.log('Server is starting');

var express = require('express');                                   //Create server port 3000
var app = express();
var server = app.listen(3000, listening);
function listening() {
	console.log("Server running at http://localhost:3000/");
}

//app.use(express.static('public'));                                  //Set front page of localhost:3000

app.get('/temp', addData, retrieveAll);                             //URL to temp, add a new data to the data set data.json and retrieve them all
app.get('/', function(request,response){
	response.send("Hi Simone");
});

function retrieveAll(request, response) { 
  console.log(Object.keys(db).length);  
  response.send(data);	
}

function addData(request, response,next) {
  var device = {};
  var id = length;
  device.device_id = id.toString();
  var time = new Date();
  device.timestamp = time.getTime();
  device.temp = Math.floor(Math.random()*51) + 50;
  db.push(device);
  var reply = {
    status: 'Data added'
  }
  var new_device = JSON.stringify(db, null, 2);
  fs.writeFile('data.json', new_device, 'utf8', finished);
    function finished(err) {
    };
  next();
  }





///// Trash

  /*app.get('/', function(request,response){
    response.send("Hi Simone");
  });*/
