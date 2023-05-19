const jwt = require('jsonwebtoken');
const {User} = require('../model/database');


const generateToken = (userdata) => {
    return jwt.sign({ userdata }, process.env.JWT_SECRETE, { expiresIn: "3d" });
}

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authentication failed. Token missing.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRETE);
        const id = decoded.userdata._id;

        const user = User.findById(id).then((user) => {
            req.fullData = user;
        });
        req.userData = decoded.userdata;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Authentication failed. Token invalid.' });
    }
}


module.exports = { generateToken, verifyToken };