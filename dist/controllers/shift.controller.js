"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _messages = require("../constants/messages");
const _shiftService = _interopRequireDefault(require("../services/shift.service"));
const _slipService = _interopRequireDefault(require("../services/slip.service"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let ShiftController = class ShiftController {
    constructor(){
        this.shiftService = new _shiftService.default();
        this.slipService = new _slipService.default();
        this.closeShift = async (req, res)=>{
            const { body  } = req;
            let nextShift, business_date;
            try {
                const { data  } = body;
                const result = await this.shiftService.closeShiftOrDate(data, 'shift');
                res.status(result.statusCode).json(result);
            } catch (e) {
                console.log(e);
                res.status(400).json({
                    statusCode: 400,
                    message: _messages.message.errors.badRequest
                });
            }
        };
        this.closeDate = async ()=>{};
    }
};
const _default = ShiftController;

//# sourceMappingURL=shift.controller.js.map