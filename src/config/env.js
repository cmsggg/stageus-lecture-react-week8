require('dotenv').config();

const env = {
    HTTP_PORT: process.env.HTTP_PORT,

    PSQL_DATABASE: process.env.PSQL_DATABASE,
    PSQL_HOST: process.env.PSQL_HOST,
    PSQL_PORT: process.env.PSQL_PORT,
    PSQL_USER: process.env.PSQL_USER,
    PSQL_PW: process.env.PSQL_PW,

    JWT_SECRET: process.env.JWT_SECRET,

    UPLOAD_DIRECTORY: process.env.UPLOAD_DIRECTORY
};

module.exports = env;