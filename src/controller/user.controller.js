const { User, AccessToken } = require("../model/database");
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const TokenService = require('../middleware/jwt.middleware')

class UserController {

  static getAllUsers(req, res) {
    User.findAll({ attributes: { exclude: ['password'] } })
      .then((users) => {

        users = users.sort((a, b) => b.createdAt - a.createdAt);
        return res.status(200).json({
          error: false,
          message: "Users fetched successfully",
          data: users
        });

      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
      });
  }

  static getUserById(req, res) {
    const { id } = req.params;

    User.findByPk(id, { attributes: { exclude: ['', 'createdAt'] } })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
      });
  }

  static createUser(req, res) {
    validationResult(req);
    /*--------------------- Validate Response ----------------*/
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, email, password } = req.body;

    User.create({ username, email, password })
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
      });

  }

  static updateUser(req, res) {
    const { id } = req.params;
    const { username, email, password } = req.body;

    User.findByPk(id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        user.username = username;
        user.email = email;
        user.password = password;
        return user.save();
      })
      .then((user) => {
        res.json(user);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
      });
  }


  /*----------------------------------------
  This Function can solve all update issh
  -----------------------------------------*/

  static specificUserUpdate(req, res) {
    const { id } = req.params;
    User.findByPk(id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        user.update(req.body);
        user.save().then((xyz) => {
          return res.json(xyz);
        });

      })
      .catch((error) => {
        res.status(500).json({ error: 'Server Error' });
      });
  };


  static async login(req, res) {

    const { username, email, password } = req.body;

    User.findOne({ where: { email: email } })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        const userData = {
          email: user.email,
          username: user.username,
          id: user.id,
          approved: user.is_approved,
          type: user.account_type,
        };

        bcrypt.compare(req.body.password, user.password).then((match) => {
          if (match) {
          

            res.cookie("refreshToken", TokenService.generateToken(userData), {
              httpOnly: true,
              maxAge: 72 * 60 * 60 * 1000,
            });

             //---------- For Refresh Token---------------------
            user.token = TokenService.generateToken(userData);
            user.save();

            UserController.saveToken(user, TokenService.generateToken(userData), req);

            //--------------------------------------------------
            return res.status(200).json({error: false, message: 'User found', data: userData, token: TokenService.generateToken(userData) });
          } else {
            return res.status(404).json({ error: true, message: 'Email and Password does not match' });
          }

        });
      })
      .catch((error) => {
        res.status(500).json({ error: 'Server Error' ,message: error });
      });
  };


  static async saveToken(user, token, req) {

    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 2);

    var previousToken = await AccessToken.findOne({
        where: {
            user_id: user.id,
            client_id: req.headers['user-agent']
        }
    });

    if (previousToken) {
        await AccessToken.update({
            token: token,
            expires_at: expiry.toISOString().slice(0, 19).replace('T', ' ')
        }, { where: { user_id: user.id, client_id: req.headers['user-agent'] } });
    } else {
        await AccessToken.create({
            user_id: user.id,
            client_id: req.headers['user-agent'],
            token: token,
            ip_addess: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            expires_at: expiry.toISOString().slice(0, 19).replace('T', ' ')
        });
    }
}


  static deleteUser(req, res) {
    const { id } = req.params;

    User.findByPk(id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        user.destroy().then(() => {
          return res.status(201).json({ error: "user deleted succesfully" });
          //return res.status(204).json("user deleted succesfully");
        });
      }).catch((error) => {
        return res.status(500).json({ error: 'Server Error' });
      });
  }
}

module.exports = UserController;
