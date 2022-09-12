import { MasterCondtions, MasterPromotions, MasterTemplates, MasterTemplateDetails } from '../interfaces/master.interface';
import { ResponsePattern } from '../interfaces/response.interface';
import ProductService from './product.service';
import StationService from './station.service';
declare class MasterService {
    productService: ProductService;
    stationService: StationService;
    getConditionsData(idxCondition: number, conditions: Array<MasterCondtions>, promotion: MasterPromotions): Promise<[number, Array<MasterCondtions>]>;
    getTemplatesData(idxTemplate: number, idxTemplateDetail: number, templates: Array<MasterTemplates>, templatesDetail: Array<MasterTemplateDetails>, promotion: MasterPromotions): Promise<[number, number, Array<MasterTemplates>]>;
    syncMasterData(stationId: BigInt): Promise<ResponsePattern>;
}
export default MasterService;
