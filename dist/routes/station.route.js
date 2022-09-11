"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _express = require("express");
const _stationController = _interopRequireDefault(require("../controllers/station.controller"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let StationRoute = class StationRoute {
    initializeRoutes() {
        this.router.get(`${this.path}`, this.stationController.listStation);
        this.router.get(`${this.path}/:id`, this.stationController.readStation);
        this.router.post(`${this.path}/:id`, this.stationController.createStation);
        this.router.put(`${this.path}/:id`, this.stationController.createStation);
        this.router.delete(`${this.path}/:id`, this.stationController.createStation);
    }
    constructor(){
        this.path = '/station';
        this.router = (0, _express.Router)();
        this.stationController = new _stationController.default();
        this.initializeRoutes();
    }
};
const _default = StationRoute;

//# sourceMappingURL=station.route.js.map