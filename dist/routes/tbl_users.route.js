"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const tbl_users_controller_1 = tslib_1.__importDefault(require("../controllers/tbl_users.controller"));
const authenCheck = tslib_1.__importStar(require("../middlewares/auth.check.authenticate.middleware"));
class tableUsers {
    constructor() {
        this.path = '/users';
        this.router = (0, express_1.Router)();
        this.usersController = new tbl_users_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}`, authenCheck.requireAuthentication, this.usersController.createUser);
        this.router.get(`${this.path}`, authenCheck.requireAuthentication, this.usersController.getUsers);
        this.router.get(`${this.path}/:id(\\d+)`, authenCheck.requireAuthentication, this.usersController.getUserById);
        this.router.put(`${this.path}/:id(\\d+)`, authenCheck.requireAuthentication, this.usersController.updateUser);
        this.router.delete(`${this.path}/:id(\\d+)`, authenCheck.requireAuthentication, this.usersController.deleteUser);
    }
}
exports.default = tableUsers;
//# sourceMappingURL=tbl_users.route.js.map