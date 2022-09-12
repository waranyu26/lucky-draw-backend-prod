"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const compression_1 = tslib_1.__importDefault(require("compression"));
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const express_1 = tslib_1.__importDefault(require("express"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const hpp_1 = tslib_1.__importDefault(require("hpp"));
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const swagger_jsdoc_1 = tslib_1.__importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = tslib_1.__importDefault(require("swagger-ui-express"));
const _config_1 = require("./config");
const error_middleware_1 = tslib_1.__importDefault(require("./middlewares/error.middleware"));
const logger_1 = require("./utils/logger");
const pg_pool_1 = tslib_1.__importDefault(require("./db_pool/pg_pool"));
const passport_1 = tslib_1.__importDefault(require("./passport"));
const passport_config_js_1 = tslib_1.__importDefault(require("./passport/passport-config.js"));
const express_flash_1 = tslib_1.__importDefault(require("express-flash"));
const express_session_1 = tslib_1.__importDefault(require("express-session"));
class App {
    constructor(routes) {
        this.app = (0, express_1.default)();
        this.env = _config_1.NODE_ENV || 'development';
        this.port = _config_1.PORT || 3000;
        this.initializePassportLib();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeDatabase();
        this.initializeSwagger();
        this.initializeErrorHandling();
    }
    listen() {
        this.app.listen(this.port, () => {
            logger_1.logger.info(`=================================`);
            logger_1.logger.info(`======= ENV: ${this.env} =======`);
            logger_1.logger.info(`🚀 App listening on the port ${this.port}`);
            logger_1.logger.info(`=================================`);
        });
    }
    getServer() {
        return this.app;
    }
    initializeMiddlewares() {
        this.app.use((0, morgan_1.default)(_config_1.LOG_FORMAT, { stream: logger_1.stream }));
        this.app.use((0, cors_1.default)({ origin: _config_1.ORIGIN, credentials: _config_1.CREDENTIALS }));
        this.app.options('*', (0, cors_1.default)());
        this.app.use((0, hpp_1.default)());
        this.app.use((0, helmet_1.default)());
        this.app.use((0, compression_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cookie_parser_1.default)());
    }
    initializeDatabase() {
        try {
            const pool = new pg_pool_1.default();
            this.app.set('dbPool', pool);
            logger_1.logger.info('Database connection was successful');
        }
        catch (e) {
            logger_1.logger.info('ERROR: Database connection failed');
            throw e;
        }
    }
    initializeRoutes(routes) {
        // ================== requirement from passport
        // inint should before route
        this.app.use(passport_1.default.initialize());
        this.app.use(passport_1.default.session());
        routes.forEach(route => {
            this.app.use('/', route.router);
        });
    }
    initializeSwagger() {
        const options = {
            swaggerDefinition: {
                info: {
                    title: 'REST API',
                    version: '1.0.0',
                    description: 'Example docs',
                },
            },
            apis: ['swagger.yaml'],
        };
        const specs = (0, swagger_jsdoc_1.default)(options);
        this.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
    }
    initializeErrorHandling() {
        this.app.use(error_middleware_1.default);
    }
    async initializePassportLib() {
        const pool = new pg_pool_1.default();
        (0, passport_config_js_1.default)(passport_1.default, async (moderator) => {
            const userProfile = await pool.aquery(`
          SELECT * FROM tbl_users as U 
          WHERE U.username = '${moderator}' AND
                U.role_id != 1
        `);
            return userProfile.rows[0];
        }, async (cashier, serialNumber) => {
            const tempStationID = await pool.aquery(`
        SELECT station_id FROM tbl_mobile_pos
        WHERE series_number = '${serialNumber}'       
        `);
            console.log(`
        SELECT station_id FROM tbl_mobile_pos
        WHERE series_number = '${serialNumber}'       
      `);
            const stationID = Number(tempStationID.rows[0].station_id);
            console.log(stationID);
            const cashierProfile = await pool.aquery(`
          SELECT * FROM tbl_users as U 
          WHERE U.username = '${cashier}' AND
                U.role_id = 1 AND
                U.station_id = ${stationID}
        `);
            return cashierProfile.rows[0];
        }, async (id) => {
            const userProfile = await pool.aquery(`
          SELECT * FROM tbl_users as U 
          WHERE U.id = '${id}'
        `);
            return userProfile.rows[0];
        });
        this.app.use((0, express_flash_1.default)());
        this.app.use((0, express_session_1.default)({
            // genid: function(req) {
            //   return crypto.randomUUID(); // use UUIDs for session IDs
            // },
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            // milisecond 
            // this case is 30 days
            cookie: { _expires: 30 * 24 * 60 * 60 * 1000 },
        }));
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map