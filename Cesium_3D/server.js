var express = require('express');
var app = express();
var path = require('path');
 
app.use(express.static(path.join(__dirname, 'html')));
 
app.get('/', function (req,res) {
    res.sendFile(path.join(__dirname, 'html', 'testmap.html'));
});
 
app.use('/', function (req, res) {
    res.send("Hello Cesium");
});
 
app.listen(8081, function () {
    console.log("Hello Cesium");
});


