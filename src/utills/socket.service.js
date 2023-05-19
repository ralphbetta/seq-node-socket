//const chatController = require('../controllers/chatController');

const socket = require("socket.io");


class SocketService {



    static initialize(server, app) {

        const io = socket(server);
        app.set('io', io);
        const activeUsers = new Set();


        // Add Socket.IO functionality
        io.on("connection", function (socket) {
            console.log("Made socket connection", socket.id);

            //----------------- Join a room
            socket.on('joinRoom', (roomId) => {
                socket.join(roomId);
            });


            socket.on("new user", function (data) {
                socket.userId = data;
                console.log(socket.userId);
                activeUsers.add(data);
                io.emit("new user", [...activeUsers]);
            });

            socket.on("chat message", function (data) {
                console.log("chat message", data);

                io.emit("chat message", data);
            });

            socket.on("chat-message-room", function (data) {
                console.log("room message", data)

                const { roomId, message } = data;
                // Emit the received message to all clients in the room
                io.to(roomId).emit('message', message);
                //Also Call the controller method to handle sending the message
            });
            

            socket.on("typing", function (data) {
                socket.broadcast.emit("typing", data);
            });

            socket.on("disconnect", () => {
                activeUsers.delete(socket.userId);
                io.emit("user disconnected", socket.userId);
            });


        });


    }
}


module.exports = SocketService;
