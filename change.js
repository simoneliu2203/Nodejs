//JSON is assigned an URL
app.get('/temp', function (req, res) {
    id_array = [];
    device_temperature = [];
    for (var i = 0; i < device.length; i++) {
        device_temperature.push(device[i].temperature);
        id_array.push(device[i].device_id);
    }
    device_data = {
        "device_id": (Math.floor(Math.random() * 20) + 1).toString(),
        "timestamp": Math.floor(Date.now() / 1000),
        "temperature": Math.floor(Math.random()*100)+32
    };
    device.push(device_data);
	
	var str_add_data = JSON.stringify(device,null,2);
	fs.writeFile('db.json', str_add_data);
	
    res.send(device);
});


//This is where it will post to TEMP
app.post('/temp', function (req, res) {
    if (!req.body.device_id || !req.body.temperature) {
        res.status(400).send("This is the original settings");
        return;
    }
    // Retrieve the Post parameters to device data.
    device_data = {
        "device_id": req.body.device_id,
        "timestamp": Math.floor(Date.now() / 1000),
        "temperature": req.body.temperature
    };

    //device to the array
    //device.push(device_data);
    // Stringify the data to rewrite the json file with the added data.
    //var str_add_data = JSON.stringify(device);
    // Write data back to the JSON file
    //fs.writeFile('db.json', str_add_data);
    //message for successful execution
    //res.send(console.log("added"));
    // load the new data to temp

    res.redirect('/temp');
});