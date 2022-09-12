"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSL_CA_CERTIFICATES = exports.DB_DATABASE = exports.DB_PORT = exports.DB_PASSWORD = exports.DB_USER_NAME = exports.DB_HOST_NAME = exports.ORIGIN = exports.LOG_DIR = exports.LOG_FORMAT = exports.SECRET_KEY = exports.PORT = exports.NODE_ENV = exports.CREDENTIALS = void 0;
const dotenv_1 = require("dotenv");
// Local
(0, dotenv_1.config)({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
exports.CREDENTIALS = process.env.CREDENTIALS === 'true';
_a = process.env, exports.NODE_ENV = _a.NODE_ENV, exports.PORT = _a.PORT, exports.SECRET_KEY = _a.SECRET_KEY, exports.LOG_FORMAT = _a.LOG_FORMAT, exports.LOG_DIR = _a.LOG_DIR, exports.ORIGIN = _a.ORIGIN;
// Database
(0, dotenv_1.config)({ path: `.env.database` });
_b = process.env, exports.DB_HOST_NAME = _b.DB_HOST_NAME, exports.DB_USER_NAME = _b.DB_USER_NAME, exports.DB_PASSWORD = _b.DB_PASSWORD, exports.DB_PORT = _b.DB_PORT, exports.DB_DATABASE = _b.DB_DATABASE, exports.SSL_CA_CERTIFICATES = _b.SSL_CA_CERTIFICATES;
//# sourceMappingURL=index.js.map