const express = require("express");
const cors = require("cors");
require('dotenv').config();
const app = express();
const globalRoute = require('../routes/api.routes');
const IndexRoute = require('../routes/');
const SocketService = require("../utills/socket.service");


class Server {

    static boot() {

        // Define CORS options
        const corsOptions = {
            origin: "http://localhost:8081", // Specify the allowed origin
            methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed HTTP methods
            allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
            credentials: true, // Enable sending cookies across different domains
            preflightContinue: false, // Disable preflight caching
            optionsSuccessStatus: 200 // Specify the status code to use for successful OPTIONS requests
        };

        app.use(cors(corsOptions));


        const { db } = require("../model/database/index");

        //Sync Database Models
        //{ force: true }
        db.sequelize.sync()
            .then(() => {
                console.log("Synced db.");
            })
            .catch((err) => {
                console.log("Failed to sync db: " + err.message);
            });

        
        app.use('/Images', express.static('./Images'))


        /*----------- DEFAULT ROUTE ----------------*/
        app.get("/", (req, res) => {res.json({ message: "Welcome to Node App" })});


         /*----------- DEFAULT ROUTE ----------------*/
        IndexRoute(app).register();
        // app.use('/api/', globalRoute);

        const PORT = process.env.PORT || 8080;
        
        const server = app.listen(PORT, () => {
            console.log(`Server is running http://127.0.0.1:${PORT}`);
           /*----------- SOCKET CONFIGURATION START ----------------*/

           SocketService.initialize(server, app);
        });

    }

}

module.exports = Server;