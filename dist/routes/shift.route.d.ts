import { Routes } from '../interfaces/routes.interface';
import ShiftController from '../controllers/shift.controller';
declare class ShiftRoute implements Routes {
    router: import("express-serve-static-core").Router;
    shiftController: ShiftController;
    constructor();
    private initializeRoutes;
}
export default ShiftRoute;
