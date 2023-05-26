
module.exports = (sequelize, Sequelize) => {
  const Permission = sequelize.define('Permission', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  },
    { timestamps: false },
    
  );


  return Permission;
};