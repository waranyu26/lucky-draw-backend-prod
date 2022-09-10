"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _pgPool = _interopRequireDefault(require("../db_pool/pg_pool"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let IndexController = class IndexController {
    constructor(){
        this.index = async (req, res, next)=>{
            try {
                const pool = new _pgPool.default();
                const create = await pool.aquery('SELECT * from users', []);
                res.status(201).json({
                    data: create,
                    message: 'created'
                });
            } catch (error) {
                next(error);
            }
        };
    }
};
const _default = IndexController;

//# sourceMappingURL=index.controller.js.map