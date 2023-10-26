const jwt = require('jsonwebtoken');
const env = require('../config/env');
const token = {};

token.createToken = (data, expireIn = '1h') => {
    const issuerName = 'stageus';
    const token = jwt.sign(
        data,
        env.JWT_SECRET,
        {
            expiresIn: expireIn || '24h',
            issuer: issuerName
        }
    );

    return token;
}

token.verifyToken = (token) => {
    try {
        return jwt.verify(token, env.JWT_SECRET);
    } catch (err) {
        return null;
    }
}

module.exports = token;
