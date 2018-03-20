var express = require('express');
var path = require('path');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io').listen(server);

// Define the port to run on
app.set('port', 3000);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });  

app.get('/gamemaster', function(req, res){
  res.sendFile(__dirname + '/gamemaster.html');
});

app.get('/scherm', function(req, res){
    res.sendFile(__dirname + '/scherm.html');
  });


io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
      });
  });


 app.listen(3000, function() {
    var port = server.address().port;
    console.log('listening on *:3000');
  });