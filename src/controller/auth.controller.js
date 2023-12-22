const { BadRequestException, InternalServerErrorException } = require('../utils/exception');
const Result = require('../utils/Result');
const { compareHash } = require('../utils/hash');
const pgPool = require('../utils/pgPool');
const { pwRegExp } = require('../utils/regExp');
const { createToken } = require('../utils/token');
const validator = require('../utils/validator');
const authController = {};

/** 로그인하기
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns
 */
authController.login = async (req, res, next) => {
    const id = req.body.id;
    const pw = req.body.pw;

    const result = new Result();

    if (!validator(id).isString().length(6, 16).end()) return next(new BadRequestException('아이디 형식이 올바르지 않습니다.'));
    if (!validator(pw).isString().testRegExp(pwRegExp).end()) return next(new BadRequestException('비밀번호 형식이 올바르지 않습니다.'));

    try {
        const selectUserSql = `SELECT
                                    pw,
                                    user_idx AS "userIdx"
                                FROM
                                    user_tb
                                WHERE
                                    user_id = $1
                                AND
                                    deleted_at IS NULL`;
        const selectUserResult = await pgPool.query(selectUserSql, [id]);

        if (!selectUserResult.rowCount) return next(new BadRequestException('존재하지 않는 아이디입니다.'));
        if (!compareHash(pw, selectUserResult.rows[0].pw)) return next(new BadRequestException('아이디 또는 비밀번호가 잘못되었습니다.'));

        const token = createToken({
            userIdx: selectUserResult.rows[0].userIdx,
        });

        result.data.token = token;
    } catch (err) {
        return next(new InternalServerErrorException('예상하지 못한 에러가 발생했습니다.', err));
    }

    res.status(result.status).send(result);
};

module.exports = authController;
