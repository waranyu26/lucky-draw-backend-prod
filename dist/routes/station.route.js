"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const station_controller_1 = tslib_1.__importDefault(require("../controllers/station.controller"));
class StationRoute {
    constructor() {
        this.path = '/station';
        this.router = (0, express_1.Router)();
        this.stationController = new station_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, this.stationController.listStation);
        this.router.get(`${this.path}/:id`, this.stationController.readStation);
        this.router.post(`${this.path}/:id`, this.stationController.createStation);
        this.router.put(`${this.path}/:id`, this.stationController.createStation);
        this.router.delete(`${this.path}/:id`, this.stationController.createStation);
    }
}
exports.default = StationRoute;
//# sourceMappingURL=station.route.js.map