import { Request, Response } from 'express';
import StationService from '../services/station.service';
import ProductService from '../services/product.service';
import MobilePosService from '../services/mobile_pos.service';
declare class StationController {
    stationService: StationService;
    productService: ProductService;
    mobliePosService: MobilePosService;
    readStation: (req: Request, res: Response) => Promise<void>;
    createStation: () => Promise<void>;
    listStation: (req: Request, res: Response) => Promise<void>;
}
export default StationController;
