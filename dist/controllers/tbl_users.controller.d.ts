import usersService from '../services/tbl_users.service';
declare class tableUsersController {
    usersService: usersService;
    private pool;
    test(req: any, res: any, next: any): any;
    getUsers: (req: any, res: any, next: any) => Promise<void>;
    getUserById: (req: any, res: any, next: any) => Promise<void>;
    createUser: (req: any, res: any, next: any) => Promise<any>;
    updateUser: (req: any, res: any, next: any) => Promise<void>;
    deleteUser: (req: any, res: any, next: any) => Promise<any>;
}
export default tableUsersController;
