"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _messages = require("../constants/messages");
const _pgPool = _interopRequireDefault(require("../db_pool/pg_pool"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let SlipService = class SlipService {
    async createSlip(values, columns) {
        try {
            const pool = new _pgPool.default();
            const insert = await pool.aquery(`INSERT INTO tbl_slip (${columns})
        VALUES ${values}
        RETURNING id
        `);
            const data = insert.rows;
            return {
                statusCode: 201,
                message: _messages.message.success.created,
                data
            };
        } catch (e) {
            console.log(e);
            return {
                statusCode: 500,
                message: _messages.message.errors.internal
            };
        }
    }
    async updateSlip(update, conditions) {
        try {
            return {
                statusCode: 204,
                message: _messages.message.success.updated
            };
        } catch (e) {
            console.log(e);
            return {
                statusCode: 500,
                message: _messages.message.errors.internal
            };
        }
    }
    async readSlip(columns, conditions) {
        try {
            const pool = new _pgPool.default();
            columns = columns ? columns : '*';
            const SQL = conditions ? `SELECT ${columns} FROM tbl_slip WHERE ${conditions}` : `SELECT ${columns} FROM tbl_slip`;
            const data = await pool.aquery(SQL);
            return {
                statusCode: 200,
                message: _messages.message.success.ok,
                data: data.rows
            };
        } catch (e) {
            console.log(e);
            return {
                statusCode: 500,
                message: _messages.message.errors.internal
            };
        }
    }
    async createSlipDetail(values, columns) {
        try {
            const pool = new _pgPool.default();
            const insert = await pool.aquery(`INSERT INTO tbl_slip_detail (${columns})
        VALUES ${values}
        RETURNING id`);
            const id = insert.rows[0].id;
            return {
                statusCode: 201,
                message: _messages.message.success.created,
                data: {
                    id
                }
            };
        } catch (e) {
            console.log(e);
            return {
                statusCode: 500,
                message: _messages.message.errors.internal
            };
        }
    }
};
const _default = SlipService;

//# sourceMappingURL=slip.service.js.map