"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const product_controller_1 = tslib_1.__importDefault(require("../controllers/product.controller"));
class ProductRoute {
    constructor() {
        this.path = '/product';
        this.router = (0, express_1.Router)();
        this.productController = new product_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/:id`, this.productController.readProduct);
        this.router.post(`${this.path}/:id`, this.productController.readProduct);
        this.router.put(`${this.path}/:id`, this.productController.readProduct);
        this.router.delete(`${this.path}/:id`, this.productController.readProduct);
    }
}
exports.default = ProductRoute;
//# sourceMappingURL=product.route.js.map