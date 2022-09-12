import MasterController from '../controllers/master.controller';
import { Routes } from '../interfaces/routes.interface';
declare class MasterRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    syncController: MasterController;
    constructor();
    private initializeRoutes;
}
export default MasterRoute;
