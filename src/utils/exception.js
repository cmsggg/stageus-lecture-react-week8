class Exception {
    error;

    constructor(error) {
        this.error = error;
    }
}

class BadRequestException extends Exception {
    err = 'Bad Request';
    message = '';
    status = 400;

    constructor(message, error) {
        super(error);

        this.message = message;
    }
}

class UnauthorizedException extends Exception {
    err = 'Unauthorized';
    message = '';
    status = 401;

    constructor(message, error) {
        super(error);

        this.message = message;
    }
}

class ForbiddenException extends Exception {
    err = 'Forbidden';
    message = '';
    status = 403;

    constructor(message, error) {
        super(error);

        this.message = message;
    }
}

class NotFoundException extends Exception {
    err = 'Not Found';
    message = '';
    status = 404;

    constructor(message, error) {
        super(error);

        this.message = message;
    }
}

class ConflictException extends Exception {
    err = 'Conflict';
    message = '예상하지 못한 에러가 발생했습니다.';
    status = 409;

    constructor(message, error) {
        super(error);

        this.message = message;
    }
}

class InternalServerErrorException extends Exception {
    err = 'Internal Server Error';
    message = '서버 에러가 발생했습니다.';
    status = 500;

    constructor(message, error) {
        super(error);

        if (message) {
            this.message = message;
        }
    }
}

module.exports = {
    Exception,
    BadRequestException,
    UnauthorizedException,
    ForbiddenException,
    NotFoundException,
    ConflictException,
    InternalServerErrorException
}