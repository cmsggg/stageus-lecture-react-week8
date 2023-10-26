const { loginAuthGuard } = require('../middleware/authGuard.mw');
const uploadRouter = require('express').Router();
const uploadController = require('../controller/upload.controller');
const { uploadProfileImgMiddleware } = require('../middleware/multer.mw');

uploadRouter.post('/profile-img', loginAuthGuard, uploadProfileImgMiddleware, uploadController.uploadProfileImg);

module.exports = uploadRouter;
