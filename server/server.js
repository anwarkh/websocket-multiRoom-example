
import http from 'http';
import * as Socket from 'socket.io'


http.createServer().listen(5000);
const io = new Socket.Server(http);


io.on('connection', (socket) => {
    console.log(`Connected: ${socket.id}`);
    socket.on('disconnect', () =>
        console.log(`Disconnected: ${socket.id}`));
    socket.on('join', (room) => {
        console.log(`Socket ${socket.id} joining ${room}`);
        socket.join(room);
    });
    socket.on('chat', (data) => {
        const { message, room } = data;
        console.log(`msg: ${message}, room: ${room}`);
        io.to(room).emit('chat', message);
    });
});

/*
var http = require('http'),
    Socket = require('socket.io');

// Create server & socket
var server = http.createServer();
server.listen(5000);
io = new Socket.Server(http);

// Add a connect listener
io.on('connection', function(socket) {

    console.log('Client connected.');

    // Disconnect listener
    socket.on('disconnect', function() {
        console.log('Client disconnected.');
    });
});*/
