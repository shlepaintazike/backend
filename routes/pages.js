const { sendDashboard, sendIndex } = require('../controllers/auth');
const { checkCookiesJWT, checkAuth } = require('../middlewars/auth');

const pagesRouter= require('express').Router();

pagesRouter.get(
    '/admin/**', 
    checkCookiesJWT, 
    checkAuth, 
    sendDashboard);

pagesRouter.get('/', sendIndex);

module.exports = pagesRouter;