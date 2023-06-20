const {Product, Review} = require('../model/database');

// image Upload
const multer = require('multer')
const path = require('path')



class ProductController {

    static addProduct = async (req, res) => {
        let info = {
            image: req.file.path,
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            published: req.body.published ? req.body.published : false
        }
        const product = await Product.create(info)
        res.status(200).send(product)
    }

    static upload = multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'Images')
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + path.extname(file.originalname))
            }
        }),
        limits: { fileSize: '1000000' },
        fileFilter: (req, file, cb) => {
            const fileTypes = /jpeg|jpg|png|gif/
            const mimeType = fileTypes.test(file.mimetype)  
            const extname = fileTypes.test(path.extname(file.originalname))
    
            if(mimeType && extname) {
                return cb(null, true)
            }
            cb('Give proper files formate to upload')
        }
    }).single('image')


    static getAllProducts = async (req, res) => {

        let products = await Product.findAll({})
        res.status(200).send(products)
    
    }

    static fetchRatedProduct = async (req, res) =>{
        const productId = req.params.id
        Product.findByPk(productId, { include: 'review' })
                .then((product) => {res.status(200).send(product)})
                .catch((error) => {
                    console.error(error);
                });
    }

   static fetchAllProductAndRatings = async (req, res)=>{

    Product.findAll({ include: 'review' }).then((products) => {
            // Access the associated ratings for each product
            products.forEach((product) => {
            const ratings = product.ratings;
            console.log(`Product: ${product.name}`);
            console.log(`Ratings: ${JSON.stringify(ratings)}`);
            });
            res.status(200).send(products)
        }).catch((error) => {
            console.error(error);
        });
   }

    static addReview = async (req, res) => {

        const id = req.params.id
        
        let data = {
            product_id: id,
            rating: req.body.rating,
            description: req.body.description
        }
    
        const review = await Review.create(data)
        res.status(200).send(review)
    
    }
    
    
    static getAllReviews = async (req, res) => {
    
        const reviews = await Review.findAll({})
        res.status(200).send(reviews)
    
    }
    
} 

module.exports = ProductController;






