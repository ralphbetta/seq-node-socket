const express = require('express');
router = express.Router();

/* ------------------------------- CONTROLLERS ------------------------------------ */
const UserController = require('../controller/user.controller');
const ProductController = require('../controller/product.controller');

/* ------------------------------- REQUEST VALIDATOR ------------------------------ */


/* ------------------------------- TOKEN VALIDATOR -------------------------------- */
const tokenMiddleware  = require('../middleware/jwt.middleware');


/* ------------------------------- ACCOUNT ROUTERS ------------------------------- */
router.get('/account', tokenMiddleware.verifyToken, UserController.getAllUsers);
router.get('/account/roles', tokenMiddleware.verifyToken, UserController.getRelationalUserFileter);
router.get('/account/roles/:id', tokenMiddleware.verifyToken, UserController.getRelationalUserById);
router.get('/account/:id', tokenMiddleware.verifyToken, UserController.getUserById);
router.post('/account', UserController.createUser);
router.post('/account/login', UserController.login);


/* ------------------------------- PRODUCT ROUTES ------------------------------- */

router.post('/addProduct', ProductController.upload , ProductController.addProduct);
router.get('/allProducts', ProductController.getAllProducts)
router.get('/allproductsandratings', ProductController.fetchAllProductAndRatings)
router.get('/ratedProduct/:id', ProductController.fetchRatedProduct)



/* ------------------------------- REVIEW ROUTES ------------------------------- */

router.get('/allReviews', ProductController.getAllReviews)
router.post('/addReview/:id', ProductController.addReview)



module.exports = router;

