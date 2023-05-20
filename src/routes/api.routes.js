const express = require('express');
router = express.Router();

/* ------------------------------- CONTROLLERS ------------------------------------ */
const UserController = require('../controller/user.controller');

/* ------------------------------- REQUEST VALIDATOR ------------------------------ */


/* ------------------------------- TOKEN VALIDATOR -------------------------------- */
const tokenMiddleware  = require('../middleware/jwt.middleware');


/* ------------------------------- ACCOUNT ROUTERS ------------------------------- */
router.get('/account', tokenMiddleware.verifyToken, UserController.getAllUsers);
router.post('/account', UserController.createUser);
router.post('/account/login', UserController.login);



module.exports = router;

