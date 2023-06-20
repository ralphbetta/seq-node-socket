
module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define(
        "Student",
        { firstName: Sequelize.STRING },
        { timestamps: false }
      );

    return Student;
};
