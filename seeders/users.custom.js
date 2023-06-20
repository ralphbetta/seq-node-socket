const { Role, Permission, User } = require('../src/model/database/');
const { Op } = require("sequelize");

const users = [
  { username: "userone", email: "user1@gmail.com", password: "1234" },
  { username: "usertwo", email: "user2@gmail.com", password: "1234" },
  { username: "userthree", email: "user3@gmail.com", password: "1234" },
  { username: "userfour", email: "user4@gmail.com", password: "1234" },
  { username: "userfive", email: "user5@gmail.com", password: "1234" }
];

const seed = async () => {
  try {
    // Create users and assign roles with permissions
    const createdUsers = await User.bulkCreate(users);
    const role = await Role.findOne({ where: { name: 'teacher' } });
    await Promise.all(createdUsers.map(user => user.addRole(role)));

    const permissions = await Permission.findAll({
      where: {
        name: {
          [Op.notIn]: ['editUser', 'deleteUser'],
        },
      },
    });

    await role.addPermissions(permissions);

    console.log('Users created and roles assigned!');
  } catch (error) {
    console.error('Error occurred:', error);
  }
};

seed();
