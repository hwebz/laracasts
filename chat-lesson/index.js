var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use('/', express.static(__dirname));

server.listen(3000);
app.get('/', function(request, response) {
    response.sendFile(__dirname + "/index.html");
});

io.on('connection', function(socket) {
    // console.log('A connection was made.');
    socket.on('chat.message', function(message) {
        io.emit('chat.message', message);
    });

    socket.on('disconnect', function() {
        io.emit('chat.message', 'User has disconnected');
    });
})