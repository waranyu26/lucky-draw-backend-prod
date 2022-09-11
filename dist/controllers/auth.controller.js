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
const _passport = _interopRequireDefault(require("passport"));
const _bcrypt = _interopRequireDefault(require("bcrypt"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let AuthController = class AuthController {
    passRegisterRequirement() {
        return 1;
    }
    logInSuccess(req, res, next) {
        console.log(req.sessionID);
        console.log(req.user);
        console.log(req.session);
        res.setHeader('Content-Type', 'application/json');
        return res.send(JSON.stringify({
            status: 200,
            sessionID: req.sessionID,
            userProfile: req.user,
            expires: req.session.cookie._expires,
            message: 'login success'
        }));
    }
    logInFailed(req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        return res.send(JSON.stringify({
            status: 401,
            message: 'login failed'
        }));
    }
    validationFailed(req, res, next) {
        const errorcode = [
            `Unauthorized access`,
            `Not a cashier`,
            `Not an admin`,
            `Not a super admin`, 
        ];
        res.setHeader('Content-Type', 'application/json');
        return res.send(JSON.stringify({
            status: 401,
            message: `Your role does not match the requirement ERROR: '${errorcode[Number(req.params.failID)]}'`
        }));
    }
    badRequest(req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        return res.send(JSON.stringify({
            status: 400,
            message: `Bad request`
        }));
    }
    constructor(){
        this.authService = new _authService.default();
        this.pool = new _pgPool.default();
        this.signUp = async (req, res)=>{
            if (this.passRegisterRequirement()) {
                let salt = await _bcrypt.default.genSalt(10);
                let hashed = await _bcrypt.default.hash(req.body.password, salt);
                let userProfile = {
                    id: req.body.id,
                    username: req.body.username,
                    password: hashed,
                    name: req.body.name,
                    phone_number: req.body.phone_number,
                    role_id: req.body.role_id,
                    station_id: req.body.station_id,
                    created_at: `CURRENT_TIMESTAMP(6)`,
                    updated_at: null,
                    password_mobile_pos: req.body.password_mobile_pos
                };
                let querySQL = `
        INSERT INTO tbl_users (
          username,
          password,
          name,
          phone_number,
          role_id,
          station_id,
          created_at,
          updated_at,
          password_mobile_pos
        )
        VALUES (
          '${userProfile.username}',
          '${userProfile.password}',
          '${userProfile.name}',
          '${userProfile.phone_number}',
          ${userProfile.role_id},
          ${userProfile.station_id},
          ${userProfile.created_at},
          ${userProfile.updated_at},
          '${userProfile.password_mobile_pos}'
      )`;
                try {
                    await this.pool.aquery(querySQL);
                    return res.end(JSON.stringify({
                        status: 200,
                        XID: req.user,
                        message: 'successfully add new user :)'
                    }));
                } catch (error) {
                    console.log(error);
                    return res.end(JSON.stringify({
                        status: 500,
                        XID: req.user,
                        message: 'internal server error'
                    }));
                }
            }
        };
        this.logIn = (req, res, next)=>{
            const authFunc = _passport.default.authenticate('local', {
                successRedirect: `/auth/success`,
                failureRedirect: `/auth/fail`,
                failureFlash: true
            });
            authFunc(req, res, next);
        };
        this.logOut = async (req, res, next)=>{
            req.logOut();
            res.setHeader('Content-Type', 'application/json');
            return res.send(JSON.stringify({
                status: 200,
                message: 'logout success'
            }));
        };
        this.test = async (req, res)=>{
            try {
                const pool = new _pgPool.default();
                const dataset = await pool.aquery('SELECT * FROM tbl_station WHERE id = 10');
                console.log(dataset.rows);
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify(dataset.rows));
            } catch (error) {
                console.log(error);
            }
        };
    }
};
const _default = AuthController;

//# sourceMappingURL=auth.controller.js.map