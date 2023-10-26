const env = require("./env");

const pgConfig = {
    user: env.PSQL_USER,
    host: env.PSQL_HOST,
    database: env.PSQL_DATABASE,
    password: env.PSQL_PW,
    port: env.PSQL_PORT,
    idleTimeoutMillis: 30000, // 30초 : idle상태가 된 후 30초가 지나면 connection이 close됨
    connectionTimeoutMillis: 2000, // 2초 : 새 클라이언트를 연결 할 때 2초 만큼의 시간이 지나면 time out됨
};

module.exports = pgConfig;
