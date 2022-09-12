import { Request, Response } from 'express';
import ProductService from '../services/product.service';
declare class ProductController {
    productService: ProductService;
    readProduct: (req: Request, res: Response) => Promise<void>;
    createProduct: () => Promise<void>;
}
export default ProductController;
