const express = require('express');
router = express.Router();

/* ------------------------------- CONTROLLERS ------------------------------------ */
const UserController = require('../controller/user.controller');

/* ------------------------------- REQUEST VALIDATOR ------------------------------ */


/* ------------------------------- TOKEN VALIDATOR -------------------------------- */


/* ------------------------------- ACCOUNT ROUTERS ------------------------------- */
router.get('/account', UserController.getAllUsers);


module.exports = router;

