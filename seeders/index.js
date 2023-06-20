const {Role, Permission, User} = require('../src/model/database/');

const roles = [
  { name: 'superadmin' },
  { name: 'admin' },
  { name: 'management' },
  { name: 'teacher' },
  { name: 'student' },
  { name: 'parent' },
];

const permissions = [
  { name: 'createUser' },
  { name: 'deleteUser' },
  { name: 'editUser' },
  { name: 'viewUser' },
];

const superAdmin =  {username: "xavi", email : "gxaviprank@gmail.com", password: "1234"};

const seed = async()=>{
Role.bulkCreate(roles).then(()=>{
  Permission.bulkCreate(permissions).then(()=>{
           // Create users and assign roles with permissions
           User.create(superAdmin).then(user => {
            Role.findOne({ where: { name: 'superadmin' } }).then(role => {
              user.addRole(role).then(() => {
                Permission.findAll().then(permissions => {
                  role.addPermissions(permissions).then(() => {
                    console.log('User created and roles assigned!');
                  });
                });
              });
            });
          });
      
  })
})
}

seed();


// >> node seeders/index.js