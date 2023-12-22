const multer = require('multer');
const { InternalServerErrorException, BadRequestException, Exception } = require('../utils/exception');
const { profileImgUploadMulterConfig, videoThumbnailUploadMulterConfig } = require('../config/multer.config');

const multerMiddleware = {};

/** 프로필 이미지 업로드 미들웨어
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns
 */
multerMiddleware.uploadProfileImgMiddleware = async (req, res, next) => {
    multer(profileImgUploadMulterConfig).single('img')(req, res, (err) => {
        if (err instanceof Exception) return next(err);

        if (err?.code === 'LIMIT_UNEXPECTED_FILE') return next(new BadRequestException('업로드한 파일 키 값이 올바르지 않습니다.'));

        if (err) return next(new InternalServerErrorException('예상하지 못한 에러가 발생했습니다.', err));

        next();
    });
};

/** 유튜브 게시글 썸네일 업로드 미들웨어
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns
 */
multerMiddleware.uploadThumbnailMiddleware = async (req, res, next) => {
    multer(videoThumbnailUploadMulterConfig).single('img')(req, res, (err) => {
        if (err instanceof Exception) return next(err);

        if (err?.code === 'LIMIT_UNEXPECTED_FILE') return next(new BadRequestException('업로드한 파일 키 값이 올바르지 않습니다.'));

        if (err) return next(new InternalServerErrorException('예상하지 못한 에러가 발생했습니다.', err));

        next();
    });
};

module.exports = multerMiddleware;
