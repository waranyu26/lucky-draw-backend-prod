"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const auth_service_1 = tslib_1.__importDefault(require("../services/auth.service"));
// import { pool } from '../database';
const pg_pool_1 = tslib_1.__importDefault(require("../db_pool/pg_pool"));
const passport_1 = tslib_1.__importDefault(require("../passport"));
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
class AuthController {
    constructor() {
        this.authService = new auth_service_1.default();
        this.pool = new pg_pool_1.default();
        // public passport = require('passport-local')
        // public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        this.signUp = async (req, res) => {
            if (this.passRegisterRequirement()) {
                let salt = await bcrypt_1.default.genSalt(10);
                let hashed = await bcrypt_1.default.hash(req.body.password, salt);
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
                // ${userProfile.id},
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
                // console.log(querySQL)
                try {
                    await this.pool.aquery(querySQL);
                    return res.end(JSON.stringify({
                        status: 200,
                        XID: req.user,
                        message: 'successfully add new user :)'
                    }));
                }
                catch (error) {
                    console.log(error);
                    return res.end(JSON.stringify({
                        status: 500,
                        XID: req.user,
                        message: 'internal server error'
                    }));
                }
            }
        };
        this.logIn = (req, res, next) => {
            const authFunc = passport_1.default.authenticate('local', {
                successRedirect: `/auth/success`,
                failureRedirect: `/auth/fail`,
                failureFlash: true,
            });
            authFunc(req, res, next);
        };
        this.logOut = async (req, res, next) => {
            req.logOut();
            // res.redirect('/login')
            res.setHeader('Content-Type', 'application/json');
            return res.send(JSON.stringify({
                status: 200,
                message: 'logout success',
                // email: req.user.email,
                // password: req.user.password,
            }));
        };
        this.test = async (req, res) => {
            try {
                const pool = new pg_pool_1.default();
                const dataset = await pool.aquery('SELECT * FROM tbl_station WHERE id = 10');
                console.log(dataset.rows);
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify(dataset.rows));
            }
            catch (error) {
                console.log(error);
            }
        };
    }
    passRegisterRequirement() {
        return 1;
    }
    logInSuccess(req, res, next) {
        console.log("SessionID:", req.sessionID);
        console.log("Profile:", req.user);
        console.log("Session", req.session);
        // console.log(res)
        res.setHeader('Content-Type', 'application/json');
        return res.send(JSON.stringify({
            status: 200,
            sessionID: req.sessionID,
            userProfile: req.user,
            expires: req.session.cookie._expires,
            message: 'login success',
            // email: req.user.email,
            // password: req.user.password,
        }));
    }
    logInFailed(req, res, next) {
        // console.log(req)
        res.setHeader('Content-Type', 'application/json');
        return res.send(JSON.stringify({
            status: 401,
            message: 'login failed',
            // email: req.user.email,
            // password: req.user.password,
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
            message: `Your role does not match the requirement ERROR: '${errorcode[Number(req.params.failID)]}'`,
            // email: req.user.email,
            // password: req.user.password,
        }));
    }
    badRequest(req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        return res.send(JSON.stringify({
            status: 400,
            message: `Bad request`,
            // email: req.user.email,
            // password: req.user.password,
        }));
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map