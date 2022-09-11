"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _express = require("express");
const _authController = _interopRequireDefault(require("../controllers/auth.controller"));
const _authCheckAuthenticateMiddleware = _interopRequireWildcard(require("../middlewares/auth.check.authenticate.middleware"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
let AuthRoute = class AuthRoute {
    initializeRoutes() {
        this.router.get(`${this.path}`, this.authController.test);
        this.router.get(`${this.path}/success`, _authCheckAuthenticateMiddleware.requireAuthentication, this.authController.logInSuccess);
        this.router.get(`${this.path}/fail`, this.authController.logInFailed);
        this.router.post(`${this.path}/signup`, [
            _authCheckAuthenticateMiddleware.requireAuthentication,
            _authCheckAuthenticateMiddleware.requireSuperAdmin
        ], this.authController.signUp);
        this.router.post(`${this.path}/login`, _authCheckAuthenticateMiddleware.requireNotAuthentication, this.authController.logIn);
        this.router.post(`${this.path}/logout`, _authCheckAuthenticateMiddleware.requireAuthentication, this.authController.logOut);
        this.router.get(`${this.path}/validate/fail/:failID`, this.authController.validationFailed);
        this.router.get(`${this.path}/badreq`, this.authController.badRequest);
        this.router.get(`${this.path}/cashier`, [
            _authCheckAuthenticateMiddleware.requireAuthentication,
            _authCheckAuthenticateMiddleware.requireCashier
        ], (req, res)=>{
            res.setHeader('Content-Type', 'application/json');
            return res.send(JSON.stringify({
                status: 200,
                message: 'Im cash cheer'
            }));
        });
        this.router.get(`${this.path}/admin`, [
            _authCheckAuthenticateMiddleware.requireAuthentication,
            _authCheckAuthenticateMiddleware.requireAdmin
        ], (req, res)=>{
            res.setHeader('Content-Type', 'application/json');
            return res.send(JSON.stringify({
                status: 200,
                message: 'Im batman'
            }));
        });
    }
    constructor(){
        this.path = '/auth';
        this.router = (0, _express.Router)();
        this.authController = new _authController.default();
        this.initializeRoutes();
    }
};
const _default = AuthRoute;

//# sourceMappingURL=auth.route.js.map