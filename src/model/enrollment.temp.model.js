
module.exports = (sequelize, Sequelize) => {
    const Enrollment = sequelize.define(
        "Enrollment",
        {},
        { timestamps: false }
      );
    return Enrollment;
};
