import { MobilePos } from '../interfaces/mobile_pos.interface';
import { ResponsePattern } from '../interfaces/response.interface';
declare class MobilePosService {
    readMobilePos(mobilePosId: BigInt, column?: string): Promise<ResponsePattern>;
    listMobilePosByStation(stationId: BigInt, column?: string): Promise<ResponsePattern>;
    gropMobilePos(mobilePosGroup: Array<MobilePos>): Object;
}
export default MobilePosService;
