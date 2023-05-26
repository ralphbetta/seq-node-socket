module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define('Role', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  },
    { timestamps: false },

    // {

    //   // Exclude fields from being returned in the model
    //   defaultScope: {
    //     attributes: {
    //       exclude: ['UserRole', 'name',]
    //     }
    //   }

    // },

  );

  return Role;
};