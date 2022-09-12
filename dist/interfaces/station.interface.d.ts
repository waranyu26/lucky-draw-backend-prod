import { MobilePos } from './mobile_pos.interface';
import { Product } from './product.interface';
export interface Station {
    id?: bigint;
    code: string;
    name_th: string;
    name_en: string;
    status: boolean;
    products?: Array<Product>;
    mobile_pos?: Array<MobilePos>;
}
