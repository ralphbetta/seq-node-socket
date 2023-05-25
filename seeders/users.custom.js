const { Role, Permission, User } = require('../src/model/database/');

const users = [
    {username: "userone", email : "user1@gmail.com", password: "1234"},
    {username: "usertwo", email : "user2@gmail.com", password: "1234"},
    {username: "userthree", email : "user3@gmail.com", password: "1234"},
    {username: "userfour", email : "user3@gmail.com", password: "1234"},
    {username: "userfive", email : "user4@gmail.com", password: "1234"}
  ];
  

const seed = async () => {

    // Create users and assign roles with permissions
    User.bulkCreate(users).then(user => {
        Role.findOne({ where: { name: 'teacher' } }).then(role => {
            user.addRole(role).then(() => {
                Permission.findAll({attribute: []}).then(permissions => {
                    role.addPermissions(permissions).then(() => {
                        console.log('User created and roles assigned!');
                    });
                });
            });
        });
    })
}

seed();


// >> node seeders/index.js