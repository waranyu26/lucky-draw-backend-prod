import { ResponsePattern } from '../interfaces/response.interface';
import SlipService from './slip.service';
declare class ShiftService {
    slipService: SlipService;
    createShift(values: string, columns: string): Promise<{
        statusCode: number;
        message: string;
        data: {
            id: any;
        };
    } | {
        statusCode: number;
        message: string;
        data?: undefined;
    }>;
    updateShift(update: string, conditions: string): Promise<{
        statusCode: number;
        message: string;
    }>;
    readShift(columns: string, conditions?: string): Promise<{
        statusCode: number;
        message: string;
        data: any[];
    } | {
        statusCode: number;
        message: string;
        data?: undefined;
    }>;
    closeShiftOrDate(data: any, shiftOrDate: string): Promise<ResponsePattern>;
}
export default ShiftService;
