"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _productService = _interopRequireDefault(require("../services/product.service"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let ProductController = class ProductController {
    constructor(){
        this.productService = new _productService.default();
        this.readProduct = async (req, res)=>{
            try {
                const productId = BigInt(req.params.id);
                const response = await this.productService.readProduct(productId, 'id, code, name, image');
                res.status(response.statusCode).json(response);
            } catch (e) {
                console.log(e);
                res.status(400).json({
                    statusCode: 400,
                    message: 'Bad Request'
                });
            }
        };
        this.createProduct = async ()=>{};
    }
};
const _default = ProductController;

//# sourceMappingURL=product.controller.js.map