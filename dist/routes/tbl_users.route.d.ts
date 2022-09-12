import UsersController from '../controllers/tbl_users.controller';
import { Routes } from '../interfaces/routes.interface';
declare class tableUsers implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    usersController: UsersController;
    constructor();
    private initializeRoutes;
}
export default tableUsers;
