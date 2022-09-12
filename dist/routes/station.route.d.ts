import StationController from '../controllers/station.controller';
import { Routes } from '../interfaces/routes.interface';
declare class StationRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    stationController: StationController;
    constructor();
    private initializeRoutes;
}
export default StationRoute;
