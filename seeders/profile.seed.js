const {User, Profile} = require('../src/model/database/');

const userID  = 2;


const profile = { full_name :"User Two", address : "22 William Street", phone_number: 09063746736};

const seed = async () => {


  try {

    //------------Method 1 //---working
    const existingUser = await User.findByPk(userID);
    const newProfile = await Profile.create(profile);

    const resp = await existingUser.setProfile(newProfile)

    console.log('User Profile seeded successfully!');
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

// customer.setAddress(address)