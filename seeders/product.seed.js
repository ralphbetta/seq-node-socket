const {Product} = require('../src/model/database/');

const products = [
    {image: "Images2/1685054554172.png",title: "Product two", price: "200", description: "description two", published: false},
    {image: "Images3/1685054554172.png",title: "Product three", price: "300", description: "description three", published: true},
    {image: "Images4/1685054554172.png",title: "Product four", price: "400", description: "description four", published: false},
    {image: "Images5/1685054554172.png",title: "Product five", price: "500", description: "description five", published: true},
];

const seed = async () => {
  try {
    await Product.bulkCreate(products);
    console.log('Product seeded successfully!');
  }  catch (error) {
    console.error('Error seeding database:', error);
  }finally {
    process.exit();
  }
};

seed();


// >> node seeders/index.js
// working.