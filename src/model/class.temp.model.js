
module.exports = (sequelize, Sequelize) => {
    const Class = sequelize.define(
        "Class",
        { className: Sequelize.STRING },
        { timestamps: false }
      );
    return Class;
};
