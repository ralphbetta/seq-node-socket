const express = require("express");
const cors = require("cors");
require('dotenv').config();
const app = express();


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
        //In development, you may need to drop existing tables and re-sync database. Just use
        //{ force: true }
        db.sequelize.sync()
            .then(() => {
                console.log("Synced db.");
            })
            .catch((err) => {
                console.log("Failed to sync db: " + err.message);
            });


        // simple route
        app.get("/", (req, res) => {
            res.json({ message: "Welcome to Node App" });
        });


        // set port, listen for requests
        const PORT = process.env.PORT || 8080;
        app.listen(PORT, () => {
            console.log(`Server is running 127.0.0.1:${PORT}.`);
        });


    }

}

module.exports = Server;