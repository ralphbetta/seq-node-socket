const { Role, Permission, User, Student, Class, Enrollment } = require('../src/model/database/');
const { Op } = require("sequelize");

const className = [
    { className: "Classone", },
    { className: "Classtwo", },
    { className: "Classthree", },
    { className: "Classfour", },
    { className: "Classfive", }
];

const newUser = { firstName: "Userone", };

const seed = async () => {

    try {


        // await Class.bulkCreate(className);

        // const student = await Student.create(newUser);
      
        // //const student = await Student.findByPk(5);

        // const classRow = await Class.findByPk(1);

        // console.log(classRow);

        // await student.addClass(classRow, { through: Enrollment });

        // console.log('Student Class Enrollment');

        /*------------------/ Fetch /----------------------*/

        const student = await Student.findOne({
            where: { firstName: "Userone" },
            include: Class
          });

        console.log(student.toJSON());

        const classRow = await Class.findOne({
            where: { className: "Classone" },
            include: Student
          });

        console.log(classRow.toJSON());

    } catch (error) {
        console.error('Error occurred:', error);
    }

};

seed();
