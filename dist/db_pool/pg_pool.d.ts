import { Pool, PoolClient, QueryResult } from 'pg';
export default class PGPool {
    pool: Pool;
    constructor();
    aquery(sqlText: string, params?: any[]): Promise<QueryResult<any>>;
    connect(): Promise<PoolClient>;
}
