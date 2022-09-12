import { Request, Response } from 'express';
import ShiftService from '../services/shift.service';
import SlipService from '../services/slip.service';
declare class ShiftController {
    shiftService: ShiftService;
    slipService: SlipService;
    closeShift: (req: Request, res: Response) => Promise<void>;
    closeDate: () => Promise<void>;
}
export default ShiftController;
