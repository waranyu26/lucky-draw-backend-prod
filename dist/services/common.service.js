"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const pg_pool_1 = tslib_1.__importDefault(require("../db_pool/pg_pool"));
const constants_1 = tslib_1.__importDefault(require("../constants"));
class CommonService {
    async getRows(sql, params) {
        const pool = new pg_pool_1.default();
        let result;
        try {
            if (params)
                result = await pool.aquery(sql, params);
            else
                result = await pool.aquery(sql);
            if (result.rowCount === 0)
                throw { message: constants_1.default.errors.notFound, status: 404 };
            return { success: true, data: { result: result.rows } };
        }
        catch (error) {
            return { success: false, data: { message: error.message }, status: error.status };
        }
    }
}
exports.default = CommonService;
//# sourceMappingURL=common.service.js.map