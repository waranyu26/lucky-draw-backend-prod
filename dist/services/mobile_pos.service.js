"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const messages_1 = require("../constants/messages");
const pg_pool_1 = tslib_1.__importDefault(require("../db_pool/pg_pool"));
class MobilePosService {
    async readMobilePos(mobilePosId, column) {
        try {
            const pool = new pg_pool_1.default();
            if (!column)
                column = '*';
            const station = await pool.aquery(`SELECT ${column} FROM tbl_products WHERE id = '${mobilePosId}'`);
            console.log(station);
            if (station.rowCount === 0)
                return { statusCode: 400, message: messages_1.message.errors.notFound };
            return { statusCode: 200, message: messages_1.message.success.ok, data: station.rows[0] };
        }
        catch (e) {
            console.log(e);
            return { statusCode: 500, message: messages_1.message.errors.internal };
        }
    }
    async listMobilePosByStation(stationId, column) {
        try {
            const pool = new pg_pool_1.default();
            if (!column)
                column = '*';
            const mobilePosRows = await pool.aquery(`SELECT ${column} FROM tbl_mobile_pos
        WHERE station_id = '${stationId}'
        ORDER BY id ASC`);
            return { statusCode: 200, message: messages_1.message.success.ok, data: mobilePosRows.rows };
        }
        catch (e) {
            return { statusCode: 500, message: messages_1.message.errors.internal };
        }
    }
    gropMobilePos(mobilePosGroup) {
        const result = {};
        const mobilePosGroupLength = mobilePosGroup.length;
        for (let i = 0; i < mobilePosGroupLength; i++) {
            const stationId = mobilePosGroup[i].station_id.toString();
            if (!result[stationId]) {
                result[stationId] = {};
                result[stationId]['mobile_pos'] = [];
            }
            const mobilePostData = {
                id: mobilePosGroup[i].id,
                name: mobilePosGroup[i].name,
                series_number: mobilePosGroup[i].series_number,
                status: mobilePosGroup[i].status,
            };
            result[stationId]['mobile_pos'].push(mobilePostData);
        }
        return result;
    }
}
exports.default = MobilePosService;
//# sourceMappingURL=mobile_pos.service.js.map