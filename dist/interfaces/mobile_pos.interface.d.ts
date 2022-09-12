export interface MobilePos {
    id: BigInt;
    station_id?: BigInt;
    name: string;
    series_number: string;
    status: number;
}
export interface MobilePosOnStation extends MobilePos {
    station_id: BigInt;
}
