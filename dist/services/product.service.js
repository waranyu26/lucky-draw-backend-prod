"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const messages_1 = require("../constants/messages");
const pg_pool_1 = tslib_1.__importDefault(require("../db_pool/pg_pool"));
class ProductService {
    async createProduct() {
        const pool = new pg_pool_1.default();
    }
    async readProduct(productId, column) {
        try {
            const pool = new pg_pool_1.default();
            if (!column)
                column = '*';
            const station = await pool.aquery(`SELECT ${column} FROM tbl_products WHERE id = '${productId}'`);
            console.log(station);
            if (station.rowCount === 0)
                return { statusCode: 400, message: messages_1.message.errors.notFound };
            return { statusCode: 200, message: messages_1.message.success.ok, data: station.rows[0] };
        }
        catch (e) {
            console.log(e);
            return { statusCode: 500, message: messages_1.message.errors.internal };
        }
    }
    async listProductByStation(stationId, column) {
        try {
            const pool = new pg_pool_1.default();
            if (!column)
                column = '*';
            const products = await pool.aquery(`SELECT ${column} FROM tbl_products AS P
        INNER JOIN tbl_station_has_product AS SHP ON SHP.product_id = P.id
        WHERE SHP.station_id = '${stationId}'
        GROUP BY P.id
        ORDER BY P.id ASC`);
            return { statusCode: 200, message: messages_1.message.success.ok, data: products.rows };
        }
        catch (e) {
            return { statusCode: 500, message: messages_1.message.errors.internal };
        }
    }
    async listProduct(column) {
        const pool = new pg_pool_1.default();
        if (!column)
            column = '*';
        const station = await pool.aquery(`SELECT * FROM tbl_stations ORDER BY id`);
        return station.rows;
    }
    async updateProduct() {
        const pool = new pg_pool_1.default();
    }
    async deleteProduct() {
        const pool = new pg_pool_1.default();
    }
    groupProduct(productGroup) {
        const result = {};
        const productGroupLength = productGroup.length;
        for (let i = 0; i < productGroupLength; i++) {
            const stationId = productGroup[i].station_id.toString();
            if (!result[stationId]) {
                result[stationId] = {};
                result[stationId]['products'] = [];
            }
            const productData = {
                id: productGroup[i].id,
                code: productGroup[i].code,
                name: productGroup[i].name,
                image: productGroup[i].image,
            };
            result[stationId]['products'].push(productData);
        }
        return result;
    }
}
exports.default = ProductService;
//# sourceMappingURL=product.service.js.map