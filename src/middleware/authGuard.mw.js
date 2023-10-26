const pgPool = require('../utils/pgPool');
const { UnauthorizedException, InternalServerErrorException } = require('../utils/exception');
const { verifyToken } = require('../utils/token');
const authGuard = {};

/** 로그인 인증 미들웨어
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 * @returns 
 */
authGuard.loginAuthGuard = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token)
        return next(new UnauthorizedException('토큰이 존재하지 않습니다.'));

    const verifiedResult = verifyToken(token);

    if (!verifiedResult) {
        return next(new UnauthorizedException('토큰이 만료되었습니다.'));
    }

    const loginUserIdx = verifiedResult.userIdx;

    try {
        const selectUserSql = `SELECT
                                    user_idx AS "userIdx"
                                FROM
                                    user_tb
                                WHERE
                                    user_idx = $1
                                AND
                                    user_tb.deleted_at IS NULL`;
        const selectUserResult = await pgPool.query(selectUserSql, [loginUserIdx]);

        if (!selectUserResult.rows[0])
            return next(new UnauthorizedException('사용자를 찾을 수 없습니다.'));

        req.userIdx = loginUserIdx;
    } catch (err) {
        return next(new InternalServerErrorException('예상하지 못한 에러가 발생했습니다.', err));
    }

    next();
}

module.exports = authGuard;
