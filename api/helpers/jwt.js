const jwt = require('jsonwebtoken');

/**
 * Genera un token JWT
 * @param {Object} payload - Información que querés guardar en el token
 * @param {String} expiresIn - Tiempo de expiración  del token
 * @returns {String} Token firmado
 */

const generateToken = (payload, expiresIn = '7d') => {
    const secret = process.env.JWT_SECRET || 'secretkey';
    return jwt.sign(payload, secret, { expiresIn });
}

module.exports = {
    generateToken
};