"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _express = require("express");
const _masterController = _interopRequireDefault(require("../controllers/master.controller"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let MasterRoute = class MasterRoute {
    initializeRoutes() {
        this.router.get(`${this.path}/:id/master`, this.syncController.syncMasterData);
    }
    constructor(){
        this.path = '/station';
        this.router = (0, _express.Router)();
        this.syncController = new _masterController.default();
        this.initializeRoutes();
    }
};
const _default = MasterRoute;

//# sourceMappingURL=master.route.js.map