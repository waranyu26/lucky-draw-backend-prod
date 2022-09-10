"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _masterService = _interopRequireDefault(require("../services/master.service"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let MasterController = class MasterController {
    constructor(){
        this.syncService = new _masterService.default();
        this.syncMasterData = async (req, res)=>{
            try {
                const stationId = BigInt(req.params.id);
                const [statusCode, masterData, message] = await this.syncService.syncMasterData(stationId);
                const response = {
                    statusCode: statusCode,
                    message: message
                };
                if (statusCode == 200) {
                    response['data'] = masterData;
                }
                res.status(statusCode).json(response);
            } catch (e) {
                console.log(e);
                res.status(400).json({
                    statusCode: 400,
                    message: 'Bad Request'
                });
            }
        };
    }
};
const _default = MasterController;

//# sourceMappingURL=master.controller.js.map