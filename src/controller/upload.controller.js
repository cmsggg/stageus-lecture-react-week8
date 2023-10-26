const { BadRequestException } = require('../utils/exception');
const Result = require('../utils/Result');

const uploadController = {};

/** 프로필 이미지 가져오기
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 * @returns 
 */
uploadController.uploadProfileImg = async (req, res, next) => {
    const fileName = req.file?.filename;

    const result = new Result();

    if (!fileName)
        return next(new BadRequestException('업로드된 파일이 존재하지 않습니다.'));

    result.data.imgPath = `/profile/${fileName}`

    res.status(result.status).send(result);
}

module.exports = uploadController;
