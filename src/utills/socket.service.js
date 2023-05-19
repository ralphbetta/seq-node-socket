//const chatController = require('../controllers/chatController');

class SocketService {

    static initialize(io, app) {

        // Add Socket.IO functionality
        app.set('io', io);

        // Add Socket.IO functionality
        io.on('connection', (socket) => {
            console.log('New client connected:', socket.id);

            // Join a room
            socket.on('joinRoom', (roomId) => {
                socket.join(roomId);
            });

            // Handle 'message' event
            socket.on('message', (data) => {
                const { roomId, message } = data;
                // Emit the received message to all clients in the room
                io.to(roomId).emit('message', message);
                //Also Call the controller method to handle sending the message
            });

            // Handle 'disconnect' event
            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });


    }
}


module.exports = SocketService;
