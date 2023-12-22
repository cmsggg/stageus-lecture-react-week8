const multer = require('multer');
const random = require('../utils/random');
const { BadRequestException } = require('../utils/exception');
const multerConfig = {};
const fs = require('fs');
const env = require('./env');
const path = require('path');

/**
 * @type {multer.Options}
 */
multerConfig.profileImgUploadMulterConfig = {
    storage: multer.diskStorage({
        destination(req, file, done) {
            const uploadDestinationPath = path.join(env.UPLOAD_DIRECTORY, 'profile');

            if (!fs.existsSync(uploadDestinationPath))
                fs.mkdirSync(uploadDestinationPath, {
                    recursive: true,
                });

            done(null, uploadDestinationPath);
        },
        filename(req, file, done) {
            const fileName = `img_${new Date().getTime()}-${random.numberString(6)}.png`;
            done(null, fileName);
        },
    }),
    fileFilter(req, file, done) {
        if (!(file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/gif')) {
            return done(new BadRequestException('유효하지 않은 파일 형식입니다.'));
        }

        done(null, true);
    },
    limits: {
        fileSize: 1 * 1024 * 1024, // ( 1MB )
    },
};

/**
 * @type {multer.Options}
 */
multerConfig.videoThumbnailUploadMulterConfig = {
    storage: multer.diskStorage({
        destination(req, file, done) {
            const uploadDestinationPath = path.join(env.UPLOAD_DIRECTORY, 'thumbnail');

            if (!fs.existsSync(uploadDestinationPath))
                fs.mkdirSync(uploadDestinationPath, {
                    recursive: true,
                });

            done(null, uploadDestinationPath);
        },
        filename(req, file, done) {
            const fileName = `img_${new Date().getTime()}-${random.numberString(6)}.png`;
            done(null, fileName);
        },
    }),
    fileFilter(req, file, done) {
        if (!(file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/gif')) {
            return done(new BadRequestException('유효하지 않은 파일 형식입니다.'));
        }

        done(null, true);
    },
    limits: {
        fileSize: 1 * 1024 * 1024, // ( 1MB )
    },
};

module.exports = multerConfig;
