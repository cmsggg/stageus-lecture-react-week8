const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRouter = require('./router/user.router');
const postRouter = require('./router/post.router');
const authRouter = require('./router/auth.router');
const corsConfig = require('./config/cors.config');
const { NotFoundException } = require('./utils/exception');
const Result = require('./utils/Result');
const uploadRouter = require('./router/upload.router');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '..', 'source')));
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsConfig));

app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/auth', authRouter);
//app.use('/upload', uploadRouter);

//404예외처리
app.use((req, res, next) => {
    next(new NotFoundException('페이지를 찾을 수 없습니다.'));
});

//최종 예외처리
app.use((err, req, res, next) => {
    const result = new Result(err);
    req.err = err;
    console.log(err);

    res.status(result.status).send(result);
});

module.exports = app;
