import { Response } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
import AuthService from '../services/auth.service';
declare class AuthController {
    authService: AuthService;
    private pool;
    signUp: (req: any, res: Response) => Promise<Response<any, Record<string, any>>>;
    logIn: (req: any, res: any, next: any) => void;
    logOut: (req: any, res: any, next: any) => Promise<any>;
    private passRegisterRequirement;
    logInSuccess(req: any, res: any, next: any): any;
    logInFailed(req: any, res: any, next: any): any;
    validationFailed(req: any, res: any, next: any): any;
    badRequest(req: any, res: any, next: any): any;
    test: (req: RequestWithUser, res: Response) => Promise<Response<any, Record<string, any>>>;
}
export default AuthController;
