const userController = require('../controller/user.controller');
const { loginAuthGuard } = require('../middleware/authGuard.mw');
const { uploadProfileImgMiddleware } = require('../middleware/multer.mw');

const userRouter = require('express').Router();

userRouter.get('/', loginAuthGuard, userController.getMyData);
userRouter.put('/profile-img', loginAuthGuard, uploadProfileImgMiddleware, userController.updateMyProfile);
userRouter.post('/', userController.signup);

module.exports = userRouter;
