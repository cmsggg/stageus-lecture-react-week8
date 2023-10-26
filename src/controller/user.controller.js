const { BadRequestException, InternalServerErrorException, ConflictException } = require('../utils/exception');
const Result = require('../utils/Result');
const { hashPw } = require('../utils/hash');
const pgPool = require('../utils/pgPool');
const { idRegExp, pwRegExp, nicknameRegExp } = require('../utils/regExp');
const validator = require('../utils/validator');
const userController = {};

/** 회원가입 하기
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 * @returns 
 */
userController.signup = async (req, res, next) => {
    const id = req.body.id;
    const pw = req.body.pw;
    const nickname = req.body.nickname;

    const result = new Result();

    if (!validator(id).isString().length(6, 16).testRegExp(idRegExp).end())
        return next(new BadRequestException('아이디 형식이 올바르지 않습니다.'));
    if (!validator(pw).isString().testRegExp(pwRegExp).end())
        return next(new BadRequestException('비밀번호 형식이 올바르지 않습니다.'));
    if (!validator(nickname).isString().length(2, 6).testRegExp(nicknameRegExp).end())
        return next(new BadRequestException('닉네임 형식이 올바르지 않습니다.'));

    try {
        const selectUserSql = `SELECT
                                    user_id AS id
                                FROM
                                    user_tb
                                WHERE
                                    user_id = $1
                                AND
                                    deleted_at IS NULL`;
        const selectUserResult = await pgPool.query(selectUserSql, [id]);

        if (selectUserResult.rowCount)
            return next(new ConflictException('이미 존재하는 아이디입니다.'));

        const insertUserSql = `INSERT INTO user_tb
                                    (user_id, pw, nickname)
                                VALUES 
                                    ($1, $2, $3)`;
        await pgPool.query(insertUserSql, [id, hashPw(pw), nickname]);
    } catch (err) {
        return next(new InternalServerErrorException('예상하지 못한 에러가 발생했습니다.', err));
    }

    res.status(result.status).send(result);
}

/** 내 정보 가져오기
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 * @returns 
 */
userController.getMyData = async (req, res, next) => {
    const loginUserIdx = req.userIdx;

    const result = new Result();

    try {
        const selectUserSql = `SELECT
                                    user_idx AS "userIdx",
                                    user_id AS id,
                                    nickname,
                                    profile_img AS "profileImgPath",
                                    TO_CHAR(created_at, 'YYYY-MM-DD hh24:mi') AS "createdAt"
                                FROM
                                    user_tb
                                WHERE
                                    user_idx = $1`;
        const selectUserResult = await pgPool.query(selectUserSql, [loginUserIdx]);

        result.data = selectUserResult.rows[0];
    } catch (err) {
        return next(new InternalServerErrorException('예상하지 못한 에러가 발생했습니다.', err));
    }

    res.status(result.status).send(result);
}

/** 프로필 이미지 수정하기
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 * @returns 
 */
userController.updateMyProfile = async (req, res, next) => {
    const loginUserIdx = req.userIdx;
    const profileImgPath = req.file?.filename || null;

    const result = new Result();

    try {
        const updateUserSql = `UPDATE
                                    user_tb
                                SET
                                    profile_img = $1
                                WHERE
                                    user_idx = $2`;
        await pgPool.query(updateUserSql, [profileImgPath, loginUserIdx]);
    } catch (err) {
        return next(new InternalServerErrorException('예상하지 못한 에러가 발생했습니다.', err));
    }

    res.status(result.status).send(result);
}

module.exports = userController;
