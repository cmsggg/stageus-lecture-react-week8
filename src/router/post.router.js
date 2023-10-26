const postController = require('../controller/post.controller');
const { loginAuthGuard } = require('../middleware/authGuard.mw');
const { uploadThumbnailMiddleware } = require('../middleware/multer.mw');
const postRouter = require('express').Router();

postRouter.post('/', loginAuthGuard, uploadThumbnailMiddleware, postController.createPost);
postRouter.get('/all', loginAuthGuard, postController.getPostAll);

module.exports = postRouter;
