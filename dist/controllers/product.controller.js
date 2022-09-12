"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const product_service_1 = tslib_1.__importDefault(require("../services/product.service"));
class ProductController {
    constructor() {
        this.productService = new product_service_1.default();
        this.readProduct = async (req, res) => {
            try {
                const productId = BigInt(req.params.id);
                const response = await this.productService.readProduct(productId, 'id, code, name, image');
                res.status(response.statusCode).json(response);
            }
            catch (e) {
                console.log(e);
                res.status(400).json({ statusCode: 400, message: 'Bad Request' });
            }
        };
        this.createProduct = async () => { };
    }
}
exports.default = ProductController;
//# sourceMappingURL=product.controller.js.map