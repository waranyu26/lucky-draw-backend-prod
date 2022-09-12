"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const messages_1 = require("../constants/messages");
const pg_pool_1 = tslib_1.__importDefault(require("../db_pool/pg_pool"));
const slip_service_1 = tslib_1.__importDefault(require("./slip.service"));
class ShiftService {
    constructor() {
        this.slipService = new slip_service_1.default();
    }
    async createShift(values, columns) {
        try {
            const pool = new pg_pool_1.default();
            const insert = await pool.aquery(`INSERT INTO tbl_report_shift (${columns})
        VALUES ${values}
        RETURNING id`);
            const id = insert.rows[0].id;
            return { statusCode: 201, message: messages_1.message.success.created, data: { id } };
        }
        catch (e) {
            console.log(e);
            return { statusCode: 500, message: messages_1.message.errors.internal };
        }
    }
    async updateShift(update, conditions) {
        try {
            const pool = new pg_pool_1.default();
            await pool.aquery(`UPDATE tbl_report_shift
        SET ${update} WHERE ${conditions}`);
            return { statusCode: 204, message: messages_1.message.success.updated };
        }
        catch (e) {
            console.log(e);
            return { statusCode: 500, message: messages_1.message.errors.internal };
        }
    }
    async readShift(columns, conditions) {
        try {
            const pool = new pg_pool_1.default();
            columns = columns ? columns : '*';
            const SQL = conditions ? `SELECT ${columns} FROM tbl_report_shift WHERE ${conditions}` : `SELECT ${columns} FROM tbl_report_shift`;
            const data = await pool.aquery(SQL);
            return { statusCode: 200, message: messages_1.message.success.ok, data: data.rows };
        }
        catch (e) {
            console.log(e);
            return { statusCode: 500, message: messages_1.message.errors.internal };
        }
    }
    async closeShiftOrDate(data, shiftOrDate) {
        let nextShift, nextDate;
        for (let i = 0; i < data.length; i++) {
            const { station_id, user_id, mobile_pos_id, business_date, slip, shift } = data[i];
            nextShift = shift + 1;
            nextDate = business_date;
            if (shiftOrDate == 'date') {
                // create Shift + 1
                nextShift = 1;
                const today = new Date();
            }
            else if (shiftOrDate == 'date') { }
            const createShift = await this.createShift(`(${station_id.toString()}, ${user_id.toString()}, ${mobile_pos_id.toString()}, '${business_date}', ${nextShift.toString()}, 0, 0,
        CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6))`, 'station_id, user_id, mobile_pos_id, date, shift, type, status, date_receive, created_at, updated_at');
            const report_shift_id = createShift.data.id;
            if (createShift.statusCode === 500)
                return { statusCode: 500, message: messages_1.message.errors.internal };
            // update Shift (status = 1)
            const updateShift = await this.updateShift(`status = 1, updated_at = CURRENT_TIMESTAMP(6)`, `station_id = ${station_id.toString()} AND user_id = ${user_id.toString()} AND
        mobile_pos_id = ${mobile_pos_id.toString()} AND date = '${business_date}' AND shift = ${shift.toString()}`);
            if (updateShift.statusCode === 500)
                return { statusCode: 500, message: messages_1.message.errors.internal };
            if (slip) {
                const slipLength = slip.length;
                for (let j = 0; j < slipLength; j++) {
                    const { promotion_id, product_id, price, number, detail } = slip[j];
                    const createSlip = await this.slipService.createSlip(`(${station_id}, ${promotion_id}, ${product_id}, ${user_id}, ${report_shift_id},
              '${business_date}', ${shift}, ${number}, ${price}, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6))`, 'station_id, promotion_id, product_id, user_id, report_shift_id, date, shift, number, price, created_at, updated_at');
                    const slip_id = createSlip.data[0].id;
                    if (detail) {
                        let values = '';
                        for (let k = 0; k < detail.length; k++) {
                            const { promotion_id, template_id, number } = detail[k];
                            values += `(${slip_id}, ${promotion_id}, ${template_id}, ${number}, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6))`;
                            values = k < detail.length - 1 ? values + ',' : values;
                        }
                        const createSlipDetail = await this.slipService.createSlipDetail(values, 'slip_id, promotion_id, template_id, number, created_at, updated_at');
                        if (createSlipDetail.statusCode === 500)
                            return { statusCode: 500, message: messages_1.message.errors.internal };
                    }
                }
            }
        }
        return { statusCode: 200, message: messages_1.message.success.ok, data: { shift: nextShift, business_date: nextDate } };
    }
}
exports.default = ShiftService;
//# sourceMappingURL=shift.service.js.map