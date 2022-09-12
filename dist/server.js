"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const app_1 = tslib_1.__importDefault(require("./app"));
const validateEnv_1 = tslib_1.__importDefault(require("./utils/validateEnv"));
const auth_route_1 = tslib_1.__importDefault(require("./routes/auth.route"));
const index_route_1 = tslib_1.__importDefault(require("./routes/index.route"));
const master_route_1 = tslib_1.__importDefault(require("./routes/master.route"));
const station_route_1 = tslib_1.__importDefault(require("./routes/station.route"));
const product_route_1 = tslib_1.__importDefault(require("./routes/product.route"));
const tbl_users_route_1 = tslib_1.__importDefault(require("./routes/tbl_users.route"));
const shift_route_1 = tslib_1.__importDefault(require("./routes/shift.route"));
(0, validateEnv_1.default)();
const app = new app_1.default([
    new index_route_1.default(),
    new tbl_users_route_1.default(),
    new auth_route_1.default(),
    new master_route_1.default(),
    new station_route_1.default(),
    new product_route_1.default(),
    new shift_route_1.default(),
]);
app.listen();
//# sourceMappingURL=server.js.map