"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const pg_pool_1 = tslib_1.__importDefault(require("../db_pool/pg_pool"));
const messages_1 = require("../constants/messages");
const product_service_1 = tslib_1.__importDefault(require("./product.service"));
const station_service_1 = tslib_1.__importDefault(require("./station.service"));
class MasterService {
    constructor() {
        this.productService = new product_service_1.default();
        this.stationService = new station_service_1.default();
    }
    async getConditionsData(idxCondition, conditions, promotion) {
        // match between promotion and conditions
        const result = [];
        while (idxCondition < conditions.length) {
            if (conditions[idxCondition].id == promotion.id) {
                const condition = {
                    product_id: conditions[idxCondition].product_id,
                    special_type: conditions[idxCondition].special_type,
                    special_num: conditions[idxCondition].special_num,
                };
                result.push(condition);
                idxCondition++;
            }
            else {
                break;
            }
        }
        return [idxCondition, result];
    }
    async getTemplatesData(idxTemplate, idxTemplateDetail, templates, templatesDetail, promotion) {
        // match between promotion and templates
        const result = [];
        while (idxTemplate < templates.length) {
            const details = [];
            while (idxTemplateDetail < templatesDetail.length) {
                if (templatesDetail[idxTemplateDetail].promotion_template_id == templates[idxTemplate].promotion_template_id) {
                    const detail = {
                        type: templatesDetail[idxTemplateDetail].type,
                        text_detail: templatesDetail[idxTemplateDetail].text_detail,
                        text_font: templatesDetail[idxTemplateDetail].text_font,
                    };
                    details.push(detail);
                    idxTemplateDetail++;
                }
                else {
                    break;
                }
            }
            if (templates[idxTemplate].id == promotion.id) {
                const template = {
                    type: templates[idxTemplate].type,
                    type_detail: templates[idxTemplate].type_detail,
                    line_type: templates[idxTemplate].line_type,
                    detail: details,
                };
                result.push(template);
                idxTemplate++;
            }
            else {
                break;
            }
        }
        return [idxTemplate, idxTemplateDetail, result];
    }
    async syncMasterData(stationId) {
        try {
            const pool = new pg_pool_1.default();
            const station = await this.stationService.readStation(stationId, 'id, code, name_th, name_en');
            if (station.statusCode === 404) {
                return { statusCode: 404, message: messages_1.message.errors.notFound };
            }
            const usersSQL = await pool.aquery(`SELECT U.username,U.password,U.password_mobile_pos,U.name,U.phone_number,R.name AS role_name
        FROM tbl_users AS U
        INNER JOIN tbl_roles AS R ON R.id = U.role_id
        WHERE U.station_id = '${stationId}'
        ORDER BY U.id ASC`);
            const products = await this.productService.listProductByStation(stationId, 'P.code, P.name');
            const promotionsSQL = await pool.aquery(`SELECT PRO.id, PRO.code, PRO.name, PRO.start_date, PRO.end_date, PRO.condition_type,
                PRO.start_price, PRO.end_price, PRO.use_num, PRO.use_max, PRO.priority, PRO.child_id
        FROM tbl_promotions AS PRO
        INNER JOIN tbl_sync_promotions_detail AS SPRO ON SPRO.promotion_id = PRO.id
        WHERE SPRO.station_id = '${stationId}'
        GROUP BY PRO.id
        ORDER BY PRO.id ASC`);
            const conditionsSQL = await pool.aquery(`SELECT PRO.id, PROC.product_id, PROC.special_type, PROC.special_num
        FROM tbl_promotions AS PRO
        INNER JOIN tbl_sync_promotions_detail AS SPRO ON SPRO.promotion_id = PRO.id
        INNER JOIN tbl_promotions_has_condition AS PROC ON PROC.promotion_id = PRO.id
        WHERE SPRO.station_id = '${stationId}'
        GROUP BY PRO.id, PROC.product_id, PROC.special_type, PROC.special_num ORDER BY PRO.id ASC`);
            const templatesSQL = await pool.aquery(`SELECT PRO.id, PROT.id as promotion_template_id, PROT.type, PROT.type_detail, PROT.line_type
        FROM tbl_promotions AS PRO
        INNER JOIN tbl_sync_promotions_detail AS SPRO ON SPRO.promotion_id = PRO.id
        INNER JOIN tbl_promotions_template AS PROT ON PROT.promotion_id = PRO.id
        WHERE SPRO.station_id = '${stationId}'
        GROUP BY PRO.id, PROT.id, PROT.type, PROT.type_detail, PROT.line_type
        ORDER BY PRO.id, PROT.id ASC`);
            const templatesDetailSQL = await pool.aquery(`SELECT PRO.id, PROT.id as promotion_template_id, TD.type, TD.text_detail, TD.text_font
        FROM tbl_promotions_template AS PROT
        INNER JOIN tbl_promotions AS PRO ON PROT.promotion_id = PRO.id
        INNER JOIN tbl_sync_promotions_detail AS SPRO ON SPRO.promotion_id = PRO.id
        LEFT JOIN tbl_template_detail AS TD ON TD.promotion_template_id = PROT.id
        WHERE SPRO.station_id = 1
        GROUP BY PRO.id, PROT.id, PROT.type, PROT.type_detail, PROT.line_type,
        TD.type, TD.text_detail, TD.text_font
        ORDER BY PRO.id, promotion_template_id ASC`);
            const users = usersSQL.rows;
            const promotions = promotionsSQL.rows;
            const conditions = conditionsSQL.rows;
            const templates = templatesSQL.rows;
            const templatesDetail = templatesDetailSQL.rows;
            let idxCondition = 0;
            for (let i = 0; i < promotions.length; i++) {
                [idxCondition, promotions[i].conditions] = await this.getConditionsData(idxCondition, conditions, promotions[i]);
            }
            let idxTemplate = 0;
            let idxTemplateDetail = 0;
            for (let i = 0; i < promotions.length; i++) {
                [idxTemplate, idxTemplateDetail, promotions[i].templates] = await this.getTemplatesData(idxTemplate, idxTemplateDetail, templates, templatesDetail, promotions[i]);
            }
            const data = {
                station: station.data,
                users,
                products: products.data,
                promotions,
            };
            return { statusCode: 200, message: messages_1.message.success.ok, data };
        }
        catch (e) {
            console.log(e);
            return { statusCode: 500, message: messages_1.message.errors.internal };
        }
    }
}
exports.default = MasterService;
//# sourceMappingURL=master.service.js.map