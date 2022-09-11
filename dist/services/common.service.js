"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _pgPool = _interopRequireDefault(require("../db_pool/pg_pool"));
const _constants = _interopRequireDefault(require("../constants/index"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let CommonService = class CommonService {
    async getRows(sql, params) {
        const pool = new _pgPool.default();
        let result;
        try {
            if (params) result = await pool.aquery(sql, params);
            else result = await pool.aquery(sql);
            if (result.rowCount === 0) throw {
                message: _constants.default.errors.notFound,
                status: 404
            };
            return {
                success: true,
                data: {
                    result: result.rows
                }
            };
        } catch (error) {
            return {
                success: false,
                data: {
                    message: error.message
                },
                status: error.status
            };
        }
    }
};
const _default = CommonService;

//# sourceMappingURL=common.service.js.map