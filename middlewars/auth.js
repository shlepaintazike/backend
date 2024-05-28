const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const checkAuth = (req, res, next) => {
    const {authorization} = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        res
        .status(401)
        .send({message: 'Необходима авторизация'});
    }

    const token = authorization.replace('Bearer ','');

    try{
        req.user = jwt.verify(token, 'some-secret-key' );
    } catch (err) {
        res
        .status(401)
        .send({message: 'Необходима авторизация'});
    }
    next();
};

const checkCookiesJWT = (req, res, next) => {
    if (!req.cookies.jwt) {
        return res.redirect ('/')
    }

    req.headers.authorization=`Bearer ${req.cookies.jwt}`;
}

module.exports = {checkAuth, checkCookiesJWT};
