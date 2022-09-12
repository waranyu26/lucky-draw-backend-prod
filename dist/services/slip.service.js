"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const messages_1 = require("../constants/messages");
const pg_pool_1 = tslib_1.__importDefault(require("../db_pool/pg_pool"));
class SlipService {
    async createSlip(values, columns) {
        try {
            const pool = new pg_pool_1.default();
            const insert = await pool.aquery(`INSERT INTO tbl_slip (${columns})
        VALUES ${values}
        RETURNING id
        `);
            const data = insert.rows;
            return { statusCode: 201, message: messages_1.message.success.created, data };
        }
        catch (e) {
            console.log(e);
            return { statusCode: 500, message: messages_1.message.errors.internal };
        }
    }
    async updateSlip(update, conditions) {
        try {
            return { statusCode: 204, message: messages_1.message.success.updated };
        }
        catch (e) {
            console.log(e);
            return { statusCode: 500, message: messages_1.message.errors.internal };
        }
    }
    async readSlip(columns, conditions) {
        try {
            const pool = new pg_pool_1.default();
            columns = columns ? columns : '*';
            const SQL = conditions ? `SELECT ${columns} FROM tbl_slip WHERE ${conditions}` : `SELECT ${columns} FROM tbl_slip`;
            const data = await pool.aquery(SQL);
            return { statusCode: 200, message: messages_1.message.success.ok, data: data.rows };
        }
        catch (e) {
            console.log(e);
            return { statusCode: 500, message: messages_1.message.errors.internal };
        }
    }
    async createSlipDetail(values, columns) {
        try {
            const pool = new pg_pool_1.default();
            const insert = await pool.aquery(`INSERT INTO tbl_slip_detail (${columns})
        VALUES ${values}
        RETURNING id`);
            const id = insert.rows[0].id;
            return { statusCode: 201, message: messages_1.message.success.created, data: { id } };
        }
        catch (e) {
            console.log(e);
            return { statusCode: 500, message: messages_1.message.errors.internal };
        }
    }
}
exports.default = SlipService;
//# sourceMappingURL=slip.service.js.map