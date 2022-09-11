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
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let MobilePosService = class MobilePosService {
    async readMobilePos(mobilePosId, column) {
        try {
            const pool = new _pgPool.default();
            if (!column) column = '*';
            const station = await pool.aquery(`SELECT ${column} FROM tbl_products WHERE id = '${mobilePosId}'`);
            console.log(station);
            if (station.rowCount === 0) return {
                statusCode: 400,
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
    async listMobilePosByStation(stationId, column) {
        try {
            const pool = new _pgPool.default();
            if (!column) column = '*';
            const mobilePosRows = await pool.aquery(`SELECT ${column} FROM tbl_mobile_pos
        WHERE station_id = '${stationId}'
        ORDER BY id ASC`);
            return {
                statusCode: 200,
                message: _messages.message.success.ok,
                data: mobilePosRows.rows
            };
        } catch (e) {
            return {
                statusCode: 500,
                message: _messages.message.errors.internal
            };
        }
    }
    gropMobilePos(mobilePosGroup) {
        const result = {};
        const mobilePosGroupLength = mobilePosGroup.length;
        for(let i = 0; i < mobilePosGroupLength; i++){
            const stationId = mobilePosGroup[i].station_id.toString();
            if (!result[stationId]) {
                result[stationId] = {};
                result[stationId]['mobile_pos'] = [];
            }
            const mobilePostData = {
                id: mobilePosGroup[i].id,
                name: mobilePosGroup[i].name,
                series_number: mobilePosGroup[i].series_number,
                status: mobilePosGroup[i].status
            };
            result[stationId]['mobile_pos'].push(mobilePostData);
        }
        return result;
    }
};
const _default = MobilePosService;

//# sourceMappingURL=mobile_pos.service.js.map