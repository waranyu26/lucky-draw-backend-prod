"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _express = require("express");
const _productController = _interopRequireDefault(require("../controllers/product.controller"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let ProductRoute = class ProductRoute {
    initializeRoutes() {
        this.router.get(`${this.path}/:id`, this.productController.readProduct);
        this.router.post(`${this.path}/:id`, this.productController.readProduct);
        this.router.put(`${this.path}/:id`, this.productController.readProduct);
        this.router.delete(`${this.path}/:id`, this.productController.readProduct);
    }
    constructor(){
        this.path = '/product';
        this.router = (0, _express.Router)();
        this.productController = new _productController.default();
        this.initializeRoutes();
    }
};
const _default = ProductRoute;

//# sourceMappingURL=product.route.js.map