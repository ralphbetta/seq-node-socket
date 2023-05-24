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


// 1 to Many Relation

db.products.hasMany(db.reviews, {
  foreignKey: 'product_id',
  as: 'review'
})

db.reviews.belongsTo(db.products, {
  foreignKey: 'product_id',
  as: 'product'
})


module.exports = {db, User, AccessToken, Message, Product, Review};
