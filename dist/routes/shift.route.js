"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _express = require("express");
const _shiftController = _interopRequireDefault(require("../controllers/shift.controller"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let ShiftRoute = class ShiftRoute {
    initializeRoutes() {
        this.router.post(`/close/shift`, this.shiftController.closeShift);
        this.router.post(`/close/date`, this.shiftController.closeShift);
    }
    constructor(){
        this.router = (0, _express.Router)();
        this.shiftController = new _shiftController.default();
        this.initializeRoutes();
    }
};
const _default = ShiftRoute;

//# sourceMappingURL=shift.route.js.map