"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const messages_1 = require("../constants/messages");
const station_service_1 = tslib_1.__importDefault(require("../services/station.service"));
const product_service_1 = tslib_1.__importDefault(require("../services/product.service"));
const mobile_pos_service_1 = tslib_1.__importDefault(require("../services/mobile_pos.service"));
class StationController {
    constructor() {
        this.stationService = new station_service_1.default();
        this.productService = new product_service_1.default();
        this.mobliePosService = new mobile_pos_service_1.default();
        this.readStation = async (req, res) => {
            try {
                const stationId = BigInt(req.params.id);
                const station = await this.stationService.readStation(stationId, 'id, code, name_th, name_en');
                if (station.statusCode !== 200)
                    res.status(station.statusCode).json({ statusCode: station.statusCode, message: station.message });
                const products = await this.productService.listProductByStation(stationId, 'P.id, P.code, P.image, P.name');
                if (products.statusCode === 500)
                    res.status(500).json({ statusCode: 500, message: messages_1.message.errors.internal });
                const mobilePosRows = await this.mobliePosService.listMobilePosByStation(stationId, 'name, series_number, status');
                if (mobilePosRows.statusCode === 500)
                    res.status(500).json({ statusCode: 500, message: messages_1.message.errors.internal });
                const data = {
                    station: station.data,
                    products: products.data,
                    mobile_pos_collection: mobilePosRows.data,
                };
                const response = { statusCode: 200, data, message: messages_1.message.success.ok };
                res.status(response.statusCode).json(response);
            }
            catch (e) {
                console.log(e);
                res.status(400).json({ statusCode: 400, message: messages_1.message.errors.badRequest });
            }
        };
        this.createStation = async () => { };
        this.listStation = async (req, res) => {
            const { page, limit, sort, order } = req.query;
            try {
                // if (isNaN(parseInt(page))) res.status(400).json({ statusCode: 400, message: 'page must be a number!'})
                const test = await this.stationService.listStation(page, limit, sort, order);
                res.status(200).json(test);
            }
            catch (e) {
                throw e;
            }
        };
    }
}
exports.default = StationController;
//# sourceMappingURL=station.controller.js.map