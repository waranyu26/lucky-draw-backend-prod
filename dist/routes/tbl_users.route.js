"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _express = require("express");
const _tblUsersController = _interopRequireDefault(require("../controllers/tbl_users.controller"));
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
let tableUsers = class tableUsers {
    initializeRoutes() {
        this.router.post(`${this.path}`, _authCheckAuthenticateMiddleware.requireAuthentication, this.usersController.createUser);
        this.router.get(`${this.path}`, _authCheckAuthenticateMiddleware.requireAuthentication, this.usersController.getUsers);
        this.router.get(`${this.path}/:id(\\d+)`, _authCheckAuthenticateMiddleware.requireAuthentication, this.usersController.getUserById);
        this.router.put(`${this.path}/:id(\\d+)`, _authCheckAuthenticateMiddleware.requireAuthentication, this.usersController.updateUser);
        this.router.delete(`${this.path}/:id(\\d+)`, _authCheckAuthenticateMiddleware.requireAuthentication, this.usersController.deleteUser);
    }
    constructor(){
        this.path = '/users';
        this.router = (0, _express.Router)();
        this.usersController = new _tblUsersController.default();
        this.initializeRoutes();
    }
};
const _default = tableUsers;

//# sourceMappingURL=tbl_users.route.js.map