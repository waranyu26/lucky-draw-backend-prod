import { ProductOnStation } from '../interfaces/product.interface';
import { ResponsePattern } from '../interfaces/response.interface';
declare class ProductService {
    createProduct(): Promise<void>;
    readProduct(productId: BigInt, column?: string): Promise<ResponsePattern>;
    listProductByStation(stationId: BigInt, column?: string): Promise<ResponsePattern>;
    listProduct(column?: string): Promise<any[]>;
    updateProduct(): Promise<void>;
    deleteProduct(): Promise<void>;
    groupProduct(productGroup: Array<ProductOnStation>): Object;
}
export default ProductService;
