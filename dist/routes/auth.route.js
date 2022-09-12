"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const auth_controller_1 = tslib_1.__importDefault(require("../controllers/auth.controller"));
const authenCheck = tslib_1.__importStar(require("../middlewares/auth.check.authenticate.middleware"));
class AuthRoute {
    constructor() {
        this.path = '/auth';
        this.router = (0, express_1.Router)();
        this.authController = new auth_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, this.authController.test);
        this.router.get(`${this.path}/success`, authenCheck.requireAuthentication, this.authController.logInSuccess);
        this.router.get(`${this.path}/fail`, this.authController.logInFailed);
        this.router.post(`${this.path}/signup`, [authenCheck.requireAuthentication, authenCheck.requireSuperAdmin], this.authController.signUp);
        this.router.post(`${this.path}/login`, authenCheck.requireNotAuthentication, this.authController.logIn);
        this.router.post(`${this.path}/logout`, authenCheck.requireAuthentication, this.authController.logOut);
        this.router.get(`${this.path}/validate/fail/:failID`, this.authController.validationFailed);
        this.router.get(`${this.path}/badreq`, this.authController.badRequest);
        // Test api
        this.router.get(`${this.path}/cashier`, [authenCheck.requireAuthentication, authenCheck.requireCashier], (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            return res.send(JSON.stringify({
                status: 200,
                message: 'Im cash cheer',
            }));
        });
        this.router.get(`${this.path}/admin`, [authenCheck.requireAuthentication, authenCheck.requireAdmin], (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            return res.send(JSON.stringify({
                status: 200,
                message: 'Im batman',
            }));
        });
    }
}
exports.default = AuthRoute;
//# sourceMappingURL=auth.route.js.map