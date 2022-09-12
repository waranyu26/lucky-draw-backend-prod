import { ResponsePattern } from '../interfaces/response.interface';
import { Station } from '../interfaces/station.interface';
import MobilePosService from './mobile_pos.service';
import ProductService from './product.service';
declare class StationService {
    productService: ProductService;
    mobilePosService: MobilePosService;
    createStation(): Promise<void>;
    readStation(station_id: BigInt, column?: string): Promise<ResponsePattern>;
    listStation(page: any, limit: any, sort: any, order: any): Promise<{
        statusCode: number;
        message: string;
        data: Station[];
    } | {
        statusCode: number;
        message: string;
        data?: undefined;
    }>;
    updateStation(): Promise<void>;
    deleteStation(): Promise<void>;
}
export default StationService;
