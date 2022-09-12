"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const pg_pool_1 = tslib_1.__importDefault(require("../db_pool/pg_pool"));
class IndexController {
    constructor() {
        this.index = async (req, res, next) => {
            try {
                const pool = new pg_pool_1.default();
                const create = await pool.aquery('SELECT * from users', []);
                // console.log(create)
                res.status(201).json({ data: create, message: 'created' });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = IndexController;
//# sourceMappingURL=index.controller.js.map