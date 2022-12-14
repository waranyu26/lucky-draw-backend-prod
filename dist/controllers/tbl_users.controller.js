"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const pg_pool_1 = tslib_1.__importDefault(require("../db_pool/pg_pool"));
const tbl_users_service_1 = tslib_1.__importDefault(require("../services/tbl_users.service"));
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
class tableUsersController {
    constructor() {
        this.usersService = new tbl_users_service_1.default();
        this.pool = new pg_pool_1.default();
        this.getUsers = async (req, res, next) => {
            try {
                const data = await this.usersService.findAllUsers();
                return res.send(await data);
            }
            catch (error) {
                next(error);
            }
        };
        this.getUserById = async (req, res, next) => {
            try {
                const data = await this.usersService.findUserById(req.params.id);
                return res.send(await data);
            }
            catch (error) {
                next(error);
            }
        };
        this.createUser = async (req, res, next) => {
            try {
                const parseUserProfile = async (req) => {
                    let salt = await bcrypt_1.default.genSalt(10);
                    let hashed = await bcrypt_1.default.hash(req.body.password, salt);
                    return {
                        id: req.body.id,
                        username: req.body.username,
                        password: hashed,
                        name: req.body.name,
                        phone_number: req.body.phone_number,
                        role_id: req.body.role_id,
                        station_id: req.body.station_id,
                        password_mobile_pos: req.body.password_mobile_pos
                    };
                };
                const userProfile = await parseUserProfile(req);
                const duplicateAddCheck = await this.usersService.duplicateAddCheck(userProfile);
                if (duplicateAddCheck != null) {
                    return res.send(duplicateAddCheck);
                }
                const data = this.usersService.createUser(userProfile);
                return res.send(await data);
            }
            catch (error) {
                next(error);
            }
        };
        this.updateUser = async (req, res, next) => {
            try {
                const conflictCheck = await this.usersService.conflictUpdateCheck(req.params.id, req.body);
                if (conflictCheck != null) {
                    return res.send(conflictCheck);
                }
                const genHash = async (password) => {
                    let salt = await bcrypt_1.default.genSalt(10);
                    return await bcrypt_1.default.hash(req.body.password, salt);
                };
                const parseChanges = async (req) => {
                    let t_string = ``;
                    let count = 0;
                    for (let field in req.body) {
                        let value = await (field == 'password' ?
                            genHash(req.body[field]) : req.body[field]);
                        let adder = isNaN(value) ? `'${value}'` : `${value}`;
                        t_string += `${field} = ${adder}, `;
                        count += 1;
                    }
                    if (count != 0) {
                        t_string = t_string.slice(0, -2);
                    }
                    console.log(t_string);
                    return t_string;
                };
                const changes = await parseChanges(req);
                const data = this.usersService.updateUser(req.params.id, changes);
                return res.send(await data);
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteUser = async (req, res, next) => {
            try {
                const data = await this.usersService.deleteUser(req.params.id);
                return res.send(await data);
            }
            catch (error) {
                next(error);
            }
        };
    }
    test(req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        return res.send(JSON.stringify({
            status: 200,
            message: 'test ctrl',
        }));
    }
}
exports.default = tableUsersController;
//# sourceMappingURL=tbl_users.controller.js.map