"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const messages_1 = require("../constants/messages");
const pg_pool_1 = tslib_1.__importDefault(require("../db_pool/pg_pool"));
const mobile_pos_service_1 = tslib_1.__importDefault(require("./mobile_pos.service"));
const product_service_1 = tslib_1.__importDefault(require("./product.service"));
class StationService {
    constructor() {
        this.productService = new product_service_1.default();
        this.mobilePosService = new mobile_pos_service_1.default();
    }
    async createStation() {
        const pool = new pg_pool_1.default();
    }
    async readStation(station_id, column) {
        try {
            const pool = new pg_pool_1.default();
            if (!column)
                column = '*';
            const station = await pool.aquery(`SELECT ${column} FROM tbl_station WHERE id = '${station_id}'`);
            if (station.rowCount === 0)
                return { statusCode: 404, message: messages_1.message.errors.notFound };
            return { statusCode: 200, message: messages_1.message.success.ok, data: station.rows[0] };
        }
        catch (e) {
            console.log(e);
            return { statusCode: 500, message: messages_1.message.errors.internal };
        }
    }
    async listStation(page, limit, sort, order) {
        try {
            page = isNaN(parseInt(page)) ? 1 : page;
            limit = isNaN(parseInt(limit)) ? 20 : limit;
            order = order.toUpperCase() === 'ASC' || order.toUpperCase() === 'DESC' ? order : 'ASC';
            const pool = new pg_pool_1.default();
            const stationsSelect = `SELECT id, code, name_th, name_en, status FROM tbl_station
      ORDER BY ${sort} ${order} LIMIT ${limit} OFFSET ${(page - 1) * limit}`;
            const stationsSQL = await pool.aquery(stationsSelect);
            const stations = stationsSQL.rows;
            // select product in stationSelect.
            const productsSQL = await pool.aquery(`SELECT S.id AS station_id, P.id, P.code, P.name, P.image FROM tbl_products AS P
        INNER JOIN tbl_station_has_product AS SHP ON SHP.product_id = P.id
        INNER JOIN (${stationsSelect}) AS S ON SHP.station_id = S.id`);
            const productGroup = productsSQL.rows;
            const productGroupResult = this.productService.groupProduct(productGroup);
            // select mobilePos in stationsSelect.
            const mobilePosSQL = await pool.aquery(`SELECT MP.id, MP.station_id, MP.name, MP.series_number, MP.status
        FROM tbl_mobile_pos AS MP
        INNER JOIN (${stationsSelect}) AS S ON MP.station_id = S.id`);
            const mobilePosGroup = mobilePosSQL.rows;
            const mobilePosGropResult = this.mobilePosService.gropMobilePos(mobilePosGroup);
            // group all datas.
            const stationAllData = [];
            const staionsLength = stations.length;
            for (let i = 0; i < staionsLength; i++) {
                const stationId = stations[i].id.toString();
                const data = {
                    id: stations[i].id,
                    code: stations[i].code,
                    name_th: stations[i].name_th,
                    name_en: stations[i].name_en,
                    status: stations[i].status,
                    products: productGroupResult[stationId] ? productGroupResult[stationId]['products'] : [],
                    mobile_pos: mobilePosGropResult[stationId] ? mobilePosGropResult[stationId]['mobile_pos'] : [],
                };
                stationAllData.push(data);
            }
            return { statusCode: 200, message: messages_1.message.success.ok, data: stationAllData };
        }
        catch (e) {
            console.log(e);
            return { statusCode: 500, message: messages_1.message.errors.internal };
        }
    }
    async updateStation() {
        const pool = new pg_pool_1.default();
    }
    async deleteStation() {
        const pool = new pg_pool_1.default();
    }
}
exports.default = StationService;
//# sourceMappingURL=station.service.js.map