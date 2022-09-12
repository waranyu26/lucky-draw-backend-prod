"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const shift_controller_1 = tslib_1.__importDefault(require("../controllers/shift.controller"));
class ShiftRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.shiftController = new shift_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`/close/shift`, this.shiftController.closeShift);
        this.router.post(`/close/date`, this.shiftController.closeShift);
    }
}
// [authenCheck.requireAuthentication]
exports.default = ShiftRoute;
//# sourceMappingURL=shift.route.js.map