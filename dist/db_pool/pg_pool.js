"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const _config_1 = require("../config");
class PGPool {
    constructor() {
        this.pool = new pg_1.Pool({
            user: _config_1.DB_USER_NAME || 'postgres',
            host: _config_1.DB_HOST_NAME || 'localhost',
            password: _config_1.DB_PASSWORD || '',
            port: parseInt(_config_1.DB_PORT) || 25060,
            database: _config_1.DB_DATABASE || 'postgres',
            ssl: {
                rejectUnauthorized: false,
                ca: _config_1.SSL_CA_CERTIFICATES || '',
            },
        });
    }
    async aquery(sqlText, params = []) {
        const pool = await this.pool.connect();
        try {
            // await pool.query(`SET SESSION postgres.user = '${cUser}'`, []);
            const result = await pool.query(sqlText, params);
            return result;
        }
        catch (e) {
            throw e;
        }
        finally {
            pool.release();
        }
    }
    async connect() {
        const pool = await this.pool.connect();
        return pool;
    }
}
exports.default = PGPool;
//# sourceMappingURL=pg_pool.js.map