const authController = require('../controller/auth.controller');
const authRouter = require('express').Router();

authRouter.post('/', authController.login);

module.exports = authRouter;
