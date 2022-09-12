"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const messages_1 = require("../constants/messages");
const shift_service_1 = tslib_1.__importDefault(require("../services/shift.service"));
const slip_service_1 = tslib_1.__importDefault(require("../services/slip.service"));
class ShiftController {
    constructor() {
        this.shiftService = new shift_service_1.default();
        this.slipService = new slip_service_1.default();
        this.closeShift = async (req, res) => {
            const { body } = req;
            let nextShift, business_date;
            try {
                const { data } = body;
                const result = await this.shiftService.closeShiftOrDate(data, 'shift');
                res.status(result.statusCode).json(result);
            }
            catch (e) {
                console.log(e);
                res.status(400).json({ statusCode: 400, message: messages_1.message.errors.badRequest });
            }
        };
        this.closeDate = async () => { };
    }
}
exports.default = ShiftController;
//# sourceMappingURL=shift.controller.js.map