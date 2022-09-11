"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _app = _interopRequireDefault(require("./app"));
const _validateEnv = _interopRequireDefault(require("./utils/validateEnv"));
const _authRoute = _interopRequireDefault(require("./routes/auth.route"));
const _indexRoute = _interopRequireDefault(require("./routes/index.route"));
const _usersRoute = _interopRequireDefault(require("./routes/users.route"));
const _masterRoute = _interopRequireDefault(require("./routes/master.route"));
const _stationRoute = _interopRequireDefault(require("./routes/station.route"));
const _productRoute = _interopRequireDefault(require("./routes/product.route"));
const _shiftRoute = _interopRequireDefault(require("./routes/shift.route"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
(0, _validateEnv.default)();
const app = new _app.default([
    new _indexRoute.default(),
    new _usersRoute.default(),
    new _authRoute.default(),
    new _masterRoute.default(),
    new _stationRoute.default(),
    new _productRoute.default(),
    new _shiftRoute.default(), 
]);
app.listen();

//# sourceMappingURL=server.js.map