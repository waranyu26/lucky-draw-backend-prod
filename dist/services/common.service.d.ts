declare class CommonService {
    getRows(sql: string, params?: Array<any>): Promise<{
        success: boolean;
        data: {
            result: any;
            message?: undefined;
        };
        status?: undefined;
    } | {
        success: boolean;
        data: {
            message: any;
            result?: undefined;
        };
        status: any;
    }>;
}
export default CommonService;
