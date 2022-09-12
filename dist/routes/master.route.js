"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const master_controller_1 = tslib_1.__importDefault(require("../controllers/master.controller"));
class MasterRoute {
    constructor() {
        this.path = '/station';
        this.router = (0, express_1.Router)();
        this.syncController = new master_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/:id/master`, this.syncController.syncMasterData);
    }
}
exports.default = MasterRoute;
//# sourceMappingURL=master.route.js.map