const postController = {};
const { BadRequestException, InternalServerErrorException } = require('../utils/exception');
const Result = require('../utils/Result');
const pgPool = require('../utils/pgPool');
const validator = require('../utils/validator');

/** 게시글 생성하기
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns
 */
postController.createPost = async (req, res, next) => {
    const loginUserIdx = req.userIdx;
    const title = req.body.title;
    const thumbnail = req.file?.filename ? `/thumbnail/${req.file.filename}` : null;

    const result = new Result();

    if (!validator(title).isString().length(2, 32).end()) return next(new BadRequestException('title 형식이 올바르지 않습니다.'));

    try {
        const insertPostSql = `INSERT INTO post_tb
                                        (user_idx, thumbnail_img, title) 
                                    VALUES 
                                        ($1, $2, $3)
                                    RETURNING
                                        post_idx AS "postIdx"`;
        const insertPostResult = await pgPool.query(insertPostSql, [loginUserIdx, thumbnail, title]);

        result.data.postIdx = insertPostResult.rows[0].postIdx;
    } catch (err) {
        return next(new InternalServerErrorException('예상하지 못한 에러가 발생했습니다.', err));
    }

    res.status(result.status).send(result);
};

/** 게시글 생성하기
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns
 */
postController.getPostAll = async (req, res, next) => {
    const page = Number(req.query.page || 1);

    const result = new Result();

    if (!validator(page).isNumber().range(1).end()) return next(new BadRequestException('page는 1 이상이어야 합니다.'));

    try {
        const selectPostSql = `SELECT
                                    post_idx AS "postIdx",
                                    user_tb.user_idx AS "userIdx",
                                    nickname,
                                    profile_img AS "profileImgPath",
                                    thumbnail_img AS "thumbnailImgPath",
                                    TO_CHAR(post_tb.created_at, 'YYYY-mm-DD') AS "createdAt"
                                FROM
                                    post_tb
                                JOIN
                                    user_tb
                                ON
                                    post_tb.user_idx = user_tb.user_idx
                                WHERE
                                    post_tb.deleted_at IS NULL
                                AND
                                    user_tb.deleted_at IS NULL
                                ORDER BY
                                    post_idx DESC
                                LIMIT
                                    20
                                OFFSET
                                    20 * (${page - 1})`;
        const selectPostResult = await pgPool.query(selectPostSql);

        result.data.postArray = selectPostResult.rows;
    } catch (err) {
        return next(new InternalServerErrorException('예상하지 못한 에러가 발생했습니다.', err));
    }

    res.status(result.status).send(result);
};

module.exports = postController;
