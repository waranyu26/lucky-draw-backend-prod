import { Request, Response } from 'express';
import syncMasterData from '../services/master.service';
declare class MasterController {
    syncService: syncMasterData;
    syncMasterData: (req: Request, res: Response) => Promise<void>;
}
export default MasterController;
