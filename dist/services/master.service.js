"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _pgPool = _interopRequireDefault(require("../db_pool/pg_pool"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let MasterService = class MasterService {
    async getConditionsData(idxCondition, conditions, promotion) {
        const result = [];
        while(idxCondition < conditions.length){
            if (conditions[idxCondition].id == promotion.id) {
                const condition = {
                    product_id: conditions[idxCondition].product_id,
                    special_type: conditions[idxCondition].special_type,
                    special_num: conditions[idxCondition].special_num
                };
                result.push(condition);
                idxCondition++;
            } else {
                break;
            }
        }
        return [
            idxCondition,
            result
        ];
    }
    async getTemplatesData(idxTemplate, idxTemplateDetail, templates, templatesDetail, promotion) {
        const result = [];
        while(idxTemplate < templates.length){
            const details = [];
            while(idxTemplateDetail < templatesDetail.length){
                if (templatesDetail[idxTemplateDetail].promotion_template_id == templates[idxTemplate].promotion_template_id) {
                    const detail = {
                        type: templatesDetail[idxTemplateDetail].type,
                        text_detail: templatesDetail[idxTemplateDetail].text_detail,
                        text_font: templatesDetail[idxTemplateDetail].text_font
                    };
                    details.push(detail);
                    idxTemplateDetail++;
                } else {
                    break;
                }
            }
            if (templates[idxTemplate].id == promotion.id) {
                const template = {
                    type: templates[idxTemplate].type,
                    type_detail: templates[idxTemplate].type_detail,
                    line_type: templates[idxTemplate].line_type,
                    detail: details
                };
                result.push(template);
                idxTemplate++;
            } else {
                break;
            }
        }
        return [
            idxTemplate,
            idxTemplateDetail,
            result
        ];
    }
    async syncMasterData(station_id) {
        try {
            const pool = new _pgPool.default();
            const stationSQL = await pool.aquery(`SELECT id,code,name_th,name_en
        FROM tbl_station WHERE id = '${station_id}'`);
            if (!stationSQL.rows.length) {
                return [
                    404,
                    [],
                    'stationID not found'
                ];
            }
            const usersSQL = await pool.aquery(`SELECT U.username,U.password,U.password_mobile_pos,U.name,U.phone_number,R.name AS role_name
        FROM tbl_users AS U
        INNER JOIN tbl_roles AS R ON R.id = U.role_id
        WHERE U.station_id = '${station_id}' ORDER BY U.id ASC`);
            const productsSQL = await pool.aquery(`SELECT P.code,P.name
        FROM tbl_products AS P
        INNER JOIN tbl_station_has_product AS SHP ON SHP.product_id = P.id
        WHERE SHP.station_id = '${station_id}' ORDER BY P.id ASC`);
            const promotionsSQL = await pool.aquery(`SELECT PRO.id, PRO.code, PRO.name, PRO.start_date, PRO.end_date, PRO.condition_type,
                PRO.start_price, PRO.end_price, PRO.use_num, PRO.use_max, PRO.priority, PRO.child_id
        FROM tbl_promotions AS PRO
        INNER JOIN tbl_sync_promotions_detail AS SPRO ON SPRO.promotion_id = PRO.id
        WHERE SPRO.station_id = '${station_id}' ORDER BY PRO.id ASC`);
            const conditionsSQL = await pool.aquery(`SELECT PRO.id, PROC.product_id, PROC.special_type, PROC.special_num
        FROM tbl_promotions AS PRO
        INNER JOIN tbl_sync_promotions_detail AS SPRO ON SPRO.promotion_id = PRO.id
        INNER JOIN tbl_promotions_has_condition AS PROC ON PROC.promotion_id = PRO.id
        WHERE SPRO.station_id = '${station_id}'
        GROUP BY PRO.id, PROC.product_id, PROC.special_type, PROC.special_num ORDER BY PRO.id ASC`);
            const templatesSQL = await pool.aquery(`SELECT PRO.id, PROT.id as promotion_template_id, PROT.type, PROT.type_detail, PROT.line_type
        FROM tbl_promotions AS PRO
        INNER JOIN tbl_sync_promotions_detail AS SPRO ON SPRO.promotion_id = PRO.id
        INNER JOIN tbl_promotions_template AS PROT ON PROT.promotion_id = PRO.id
        WHERE SPRO.station_id = '${station_id}'
        GROUP BY PRO.id, PROT.id, PROT.type, PROT.type_detail, PROT.line_type
        ORDER BY PRO.id, PROT.id ASC`);
            const templatesDetailSQL = await pool.aquery(`SELECT PRO.id, PROT.id as promotion_template_id, TD.type, TD.text_detail, TD.text_font
        FROM tbl_promotions_template AS PROT
        INNER JOIN tbl_promotions AS PRO
        ON PROT.promotion_id = PRO.id
        INNER JOIN tbl_sync_promotions_detail AS SPRO
        ON SPRO.promotion_id = PRO.id
        LEFT JOIN tbl_template_detail AS TD
        ON TD.promotion_template_id = PROT.id
        WHERE SPRO.station_id = 1
        GROUP BY PRO.id, PROT.id, PROT.type, PROT.type_detail, PROT.line_type, TD.type, TD.text_detail, TD.text_font
        ORDER BY PRO.id, promotion_template_id ASC`);
            const station = stationSQL.rows[0];
            const users = usersSQL.rows;
            const products = productsSQL.rows;
            const promotions = promotionsSQL.rows;
            const conditions = conditionsSQL.rows;
            const templates = templatesSQL.rows;
            const templatesDetail = templatesDetailSQL.rows;
            let idxCondition = 0;
            for(let i = 0; i < promotions.length; i++){
                [idxCondition, promotions[i].conditions] = await this.getConditionsData(idxCondition, conditions, promotions[i]);
            }
            let idxTemplate = 0;
            let idxTemplateDetail = 0;
            for(let i1 = 0; i1 < promotions.length; i1++){
                [idxTemplate, idxTemplateDetail, promotions[i1].templates] = await this.getTemplatesData(idxTemplate, idxTemplateDetail, templates, templatesDetail, promotions[i1]);
            }
            const data = {
                station,
                users,
                products,
                promotions
            };
            return [
                200,
                data,
                'syncMasterData'
            ];
        } catch (e) {
            console.log(e);
            return [
                500,
                [],
                'Internal Server Error'
            ];
        }
    }
};
const _default = MasterService;

//# sourceMappingURL=master.service.js.map