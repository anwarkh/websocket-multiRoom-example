import io from 'socket.io-client';

let socket;
export const initiateSocket = (room) => {
    socket = io('http://localhost:5000');
    console.log(`Connecting socket...`);
    socket.on("connect", () => {
        if (socket && room) {
            socket.emit('join', room);
        }
    });
    socket.onopen = function () {
        console.log("Opening a connection...");
    };
    socket.onclose = function (evt) {
        console.log("I'm sorry. Bye!");
    };
    socket.onmessage = function (evt) {
        console.log("message", evt);
    };
    socket.onerror = function (evt) {
        console.log("ERR: " + evt.data);
    };

}
export const disconnectSocket = () => {
    console.log('Disconnecting socket...');
    if (socket) socket.disconnect();
}
export const subscribeToChat = (cb) => {
    if (!socket) return (true);
    socket.on('chat', msg => {
        console.log('Websocket event received!');
        return cb(null, msg);
    });
}
export const sendMessage = (room, message) => {
    if (socket) socket.emit('chat', {message, room});
}