const enviromentalConfig = require('../../config/db.config');
const dbConfig = enviromentalConfig.development;

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// const Tutorial =  db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
const User = db.users = require("../user.model")(sequelize, Sequelize);
const AccessToken = db.accesstokens = require("../accessToken.model")(sequelize, Sequelize);
const Message = db.messages = require("../message.model")(sequelize, Sequelize);
const Product = db.products = require("../product.model")(sequelize, Sequelize);
const Review = db.reviews = require("../review.model")(sequelize, Sequelize);
const Permission = db.permissions = require("../permision.model")(sequelize, Sequelize);
const Role = db.roles = require("../roles.model")(sequelize, Sequelize);


const Student = db.students = require("../student.temp.model")(sequelize, Sequelize);
const Class = db.classes = require("../class.temp.model")(sequelize, Sequelize);
const Enrollment = db.enrollments = require("../enrollment.temp.model")(sequelize, Sequelize);

// 1 to Many Relation

// --------------------// Define the associations //-----------------------

db.products.hasMany(db.reviews, {foreignKey: 'product_id', as: 'review'});
db.reviews.belongsTo(db.products, {foreignKey: 'product_id', as: 'product'});

//-------------------- User Role Permission ----------------

User.belongsToMany(Role, { through: 'UserRole' });
Role.belongsToMany(User, { through: 'UserRole' });
Role.belongsToMany(Permission, { through: 'RolePermission' });
Permission.belongsToMany(Role, { through: 'RolePermission' });

//-------------------- Class Student Enrollment ----------------
Student.belongsToMany(Class, { through: Enrollment });
Class.belongsToMany(Student, { through: Enrollment });



// -------------ONE TO ONE------------
// Person.hasOne(models.House);
// House.belongsTo(models.Person);



// User.hasMany(Order, { foreignKey: 'userId',  as: 'user_order' });
// Order.belongsTo(User, { foreignKey: 'userId' });


// Order.hasOne(Payment, { foreignKey: 'orderId' });
// Payment.belongsTo(Order, { foreignKey: 'orderId' });


module.exports = {
  db,
  User,
  AccessToken,
  Message,
  Product,
  Review,
  Permission,
  Role,
  Student, 
  Class, 
  Enrollment
};
