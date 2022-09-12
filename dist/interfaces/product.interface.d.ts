export interface Product {
    id: BigInt;
    code: string;
    name: string;
    image: string;
}
export interface ProductOnStation extends Product {
    station_id: BigInt;
    station_code: string;
    station_name_th: string;
    station_name_en: string;
}
