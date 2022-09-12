import ProductController from '../controllers/product.controller';
import { Routes } from '../interfaces/routes.interface';
declare class ProductRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    productController: ProductController;
    constructor();
    private initializeRoutes;
}
export default ProductRoute;
