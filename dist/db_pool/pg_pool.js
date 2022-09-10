"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>PGPool
});
const _pg = require("pg");
const _config = require("../config");
let PGPool = class PGPool {
    async aquery(sqlText, params = []) {
        const pool = await this.pool.connect();
        try {
            const result = await pool.query(sqlText, params);
            return result;
        } catch (e) {
            throw e;
        } finally{
            pool.release();
        }
    }
    async connect() {
        const pool = await this.pool.connect();
        return pool;
    }
    constructor(){
        this.pool = new _pg.Pool({
            user: _config.DB_USER_NAME || 'postgres',
            host: _config.DB_HOST_NAME || 'localhost',
            password: _config.DB_PASSWORD || '',
            port: parseInt(_config.DB_PORT) || 25060,
            database: _config.DB_DATABASE || 'postgres',
            ssl: {
                rejectUnauthorized: false,
                ca: _config.SSL_CA_CERTIFICATES || ''
            }
        });
    }
};

//# sourceMappingURL=pg_pool.js.map