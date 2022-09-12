"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const master_service_1 = tslib_1.__importDefault(require("../services/master.service"));
class MasterController {
    constructor() {
        this.syncService = new master_service_1.default();
        this.syncMasterData = async (req, res) => {
            try {
                const stationId = BigInt(req.params.id);
                const response = await this.syncService.syncMasterData(stationId);
                res.status(response.statusCode).json(response);
            }
            catch (e) {
                console.log(e);
                res.status(400).json({ statusCode: 400, message: 'Bad Request' });
            }
        };
    }
}
exports.default = MasterController;
//# sourceMappingURL=master.controller.js.map