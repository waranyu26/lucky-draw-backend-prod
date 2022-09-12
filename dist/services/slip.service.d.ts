declare class SlipService {
    createSlip(values: string, columns: string): Promise<{
        statusCode: number;
        message: string;
        data: any[];
    } | {
        statusCode: number;
        message: string;
        data?: undefined;
    }>;
    updateSlip(update: string, conditions: string): Promise<{
        statusCode: number;
        message: string;
    }>;
    readSlip(columns: string, conditions?: string): Promise<{
        statusCode: number;
        message: string;
        data: any[];
    } | {
        statusCode: number;
        message: string;
        data?: undefined;
    }>;
    createSlipDetail(values: string, columns: string): Promise<{
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
}
export default SlipService;
