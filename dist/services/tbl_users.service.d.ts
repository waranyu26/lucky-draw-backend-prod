import PGPool from '../db_pool/pg_pool';
declare class tableUsersService {
    pool: PGPool;
    findAllUsers(): Promise<{
        statusCode: number;
        message: string;
        data: any[];
    } | {
        statusCode: number;
        message: string;
        data?: undefined;
    }>;
    findUserById(userId: any): Promise<{
        statusCode: number;
        message: string;
        data: any[];
    } | {
        statusCode: number;
        message: string;
        data?: undefined;
    }>;
    createUser(userProfile: any): Promise<{
        statusCode: number;
        message: string;
    }>;
    updateUser(userId: any, changesAsString: any): Promise<{
        statusCode: number;
        message: string;
    }>;
    deleteUser(userId: any): Promise<{
        statusCode: number;
        message: string;
    }>;
    conflictUpdateCheck(id: any, changes: any): Promise<{
        statusCode: number;
        message: string;
    }>;
    duplicateAddCheck(userProfile: any): Promise<{
        statusCode: number;
        message: string;
    }>;
}
export default tableUsersService;
