const jwt = require('jsonwebtoken')

const generateToken = id =>{
    return jwt.sign({id}, 'abcd',{expiresIn: "30d"});
}

module.exports = generateToken;