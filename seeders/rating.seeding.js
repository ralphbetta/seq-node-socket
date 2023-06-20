const {Review, Product} = require('../src/model/database/');

const productId  = "981ad9eb-6ffd-4dca-ba16-5707e389f832"

const reviews = [
    { rating :5, description : `five star rating for product ${productId}`, product_id: productId},
    { rating :3, description : `three star rating for product ${productId}`, product_id: productId},
    { rating :2, description : `two star rating for product ${productId}`, product_id: productId},
];

const seed = async () => {


  try {

    //Method One //---working

    //await Review.bulkCreate(reviews);

    //------------Method 2 //---working
    const product = await Product.findByPk(productId);
    const newReiew = await Review.create(reviews[0]);
    const reviewedProduct =  await product.addReview(newReiew);

    console.log('Ratings seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit();
  }
};

seed();


// >> node seeders/index.js
// working
// comment one method out
//method one perfect for bulk review