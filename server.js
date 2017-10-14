var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var users = {};

/*app.get('/', function(req, res) {
  res.sendFile(__dirname + '/chatPage.html');
});*/

app.use(express.static('public'));

io.on('connection', function(user) {
  user.on('join', function(name) {
    users[user.id] = name;
    user.emit('update', 'You have been connected to the chat.');
    user.broadcast.emit('update', name + ' has joined the chat.');
  });

  user.on('send', function(msg) {
    console.log('Message: ' + msg);
    user.broadcast.emit('chat', users[user.id], msg);
  });

  user.on('disconnect', function() {
    console.log('Disconnected ' + users[user.id]);
    io.emit('update', users[user.id] + ' has left the server.');
    delete users[user.id];
  });

});



http.listen(80, function() {
  console.log('listening on port 80');
});
