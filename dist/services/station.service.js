"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _messages = require("../constants/messages");
const _pgPool = _interopRequireDefault(require("../db_pool/pg_pool"));
const _mobilePosService = _interopRequireDefault(require("./mobile_pos.service"));
const _productService = _interopRequireDefault(require("./product.service"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let StationService = class StationService {
    async createStation() {
        const pool = new _pgPool.default();
    }
    async readStation(station_id, column) {
        try {
            const pool = new _pgPool.default();
            if (!column) column = '*';
            const station = await pool.aquery(`SELECT ${column} FROM tbl_station WHERE id = '${station_id}'`);
            if (station.rowCount === 0) return {
                statusCode: 404,
                message: _messages.message.errors.notFound
            };
            return {
                statusCode: 200,
                message: _messages.message.success.ok,
                data: station.rows[0]
            };
        } catch (e) {
            console.log(e);
            return {
                statusCode: 500,
                message: _messages.message.errors.internal
            };
        }
    }
    async listStation(page, limit, sort, order) {
        try {
            page = isNaN(parseInt(page)) ? 1 : page;
            limit = isNaN(parseInt(limit)) ? 20 : limit;
            order = order.toUpperCase() === 'ASC' || order.toUpperCase() === 'DESC' ? order : 'ASC';
            const pool = new _pgPool.default();
            const stationsSelect = `SELECT id, code, name_th, name_en, status FROM tbl_station
      ORDER BY ${sort} ${order} LIMIT ${limit} OFFSET ${(page - 1) * limit}`;
            const stationsSQL = await pool.aquery(stationsSelect);
            const stations = stationsSQL.rows;
            const productsSQL = await pool.aquery(`SELECT S.id AS station_id, P.id, P.code, P.name, P.image FROM tbl_products AS P
        INNER JOIN tbl_station_has_product AS SHP ON SHP.product_id = P.id
        INNER JOIN (${stationsSelect}) AS S ON SHP.station_id = S.id`);
            const productGroup = productsSQL.rows;
            const productGroupResult = this.productService.groupProduct(productGroup);
            const mobilePosSQL = await pool.aquery(`SELECT MP.id, MP.station_id, MP.name, MP.series_number, MP.status
        FROM tbl_mobile_pos AS MP
        INNER JOIN (${stationsSelect}) AS S ON MP.station_id = S.id`);
            const mobilePosGroup = mobilePosSQL.rows;
            const mobilePosGropResult = this.mobilePosService.gropMobilePos(mobilePosGroup);
            const stationAllData = [];
            const staionsLength = stations.length;
            for(let i = 0; i < staionsLength; i++){
                const stationId = stations[i].id.toString();
                const data = {
                    id: stations[i].id,
                    code: stations[i].code,
                    name_th: stations[i].name_th,
                    name_en: stations[i].name_en,
                    status: stations[i].status,
                    products: productGroupResult[stationId] ? productGroupResult[stationId]['products'] : [],
                    mobile_pos: mobilePosGropResult[stationId] ? mobilePosGropResult[stationId]['mobile_pos'] : []
                };
                stationAllData.push(data);
            }
            return {
                statusCode: 200,
                message: _messages.message.success.ok,
                data: stationAllData
            };
        } catch (e) {
            console.log(e);
            return {
                statusCode: 500,
                message: _messages.message.errors.internal
            };
        }
    }
    async updateStation() {
        const pool = new _pgPool.default();
    }
    async deleteStation() {
        const pool = new _pgPool.default();
    }
    constructor(){
        this.productService = new _productService.default();
        this.mobilePosService = new _mobilePosService.default();
    }
};
const _default = StationService;

//# sourceMappingURL=station.service.js.map