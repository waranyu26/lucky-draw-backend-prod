"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _messages = require("../constants/messages");
const _stationService = _interopRequireDefault(require("../services/station.service"));
const _productService = _interopRequireDefault(require("../services/product.service"));
const _mobilePosService = _interopRequireDefault(require("../services/mobile_pos.service"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let StationController = class StationController {
    constructor(){
        this.stationService = new _stationService.default();
        this.productService = new _productService.default();
        this.mobliePosService = new _mobilePosService.default();
        this.readStation = async (req, res)=>{
            try {
                const stationId = BigInt(req.params.id);
                const station = await this.stationService.readStation(stationId, 'id, code, name_th, name_en');
                if (station.statusCode !== 200) res.status(station.statusCode).json({
                    statusCode: station.statusCode,
                    message: station.message
                });
                const products = await this.productService.listProductByStation(stationId, 'P.id, P.code, P.image, P.name');
                if (products.statusCode === 500) res.status(500).json({
                    statusCode: 500,
                    message: _messages.message.errors.internal
                });
                const mobilePosRows = await this.mobliePosService.listMobilePosByStation(stationId, 'name, series_number, status');
                if (mobilePosRows.statusCode === 500) res.status(500).json({
                    statusCode: 500,
                    message: _messages.message.errors.internal
                });
                const data = {
                    station: station.data,
                    products: products.data,
                    mobile_pos_collection: mobilePosRows.data
                };
                const response = {
                    statusCode: 200,
                    data,
                    message: _messages.message.success.ok
                };
                res.status(response.statusCode).json(response);
            } catch (e) {
                console.log(e);
                res.status(400).json({
                    statusCode: 400,
                    message: _messages.message.errors.badRequest
                });
            }
        };
        this.createStation = async ()=>{};
        this.listStation = async (req, res)=>{
            const { page , limit , sort , order  } = req.query;
            try {
                const test = await this.stationService.listStation(page, limit, sort, order);
                res.status(200).json(test);
            } catch (e) {
                throw e;
            }
        };
    }
};
const _default = StationController;

//# sourceMappingURL=station.controller.js.map