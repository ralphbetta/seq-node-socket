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
 const User = db.tutorials = require("../user.model")(sequelize, Sequelize);
// const AccessToken = db.tutorials = require("./accessToken.model.js")(sequelize, Sequelize);

module.exports = {db};
