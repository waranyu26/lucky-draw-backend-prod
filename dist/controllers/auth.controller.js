"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _authService = _interopRequireDefault(require("../services/auth.service"));
const _pgPool = _interopRequireDefault(require("../db_pool/pg_pool"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let AuthController = class AuthController {
    constructor(){
        this.authService = new _authService.default();
        this.signUp = async (req, res, next)=>{
            try {
                const userData = req.body;
                const signUpUserData = await this.authService.signup(userData);
                res.status(201).json({
                    data: signUpUserData,
                    message: 'signup'
                });
            } catch (error) {
                next(error);
            }
        };
        this.logIn = async (req, res, next)=>{
            try {
                const userData = req.body;
                const { cookie , findUser  } = await this.authService.login(userData);
                res.setHeader('Set-Cookie', [
                    cookie
                ]);
                res.status(200).json({
                    data: findUser,
                    message: 'login'
                });
            } catch (error) {
                next(error);
            }
        };
        this.logOut = async (req, res, next)=>{
            try {
                const userData = req.user;
                const logOutUserData = await this.authService.logout(userData);
                res.setHeader('Set-Cookie', [
                    'Authorization=; Max-age=0'
                ]);
                res.status(200).json({
                    data: logOutUserData,
                    message: 'logout'
                });
            } catch (error) {
                next(error);
            }
        };
        this.test = async (req, res)=>{
            try {
                const pool = new _pgPool.default();
                const dataset = await pool.aquery('SELECT * FROM tbl_station WHERE id = 10');
                console.log(dataset.rows);
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify(dataset.rows));
            } catch (err) {
                console.log(err);
            }
        };
    }
};
const _default = AuthController;

//# sourceMappingURL=auth.controller.js.map