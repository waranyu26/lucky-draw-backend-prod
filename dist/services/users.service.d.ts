import { CreateUserDto } from '../dtos/users.dto';
import { User } from '../interfaces/users.interface';
declare class UserService {
    users: User[];
    findAllUser(): Promise<User[]>;
    findUserById(userId: number): Promise<User>;
    createUser(userData: CreateUserDto): Promise<User>;
    updateUser(userId: number, userData: CreateUserDto): Promise<User[]>;
    deleteUser(userId: number): Promise<User[]>;
}
export default UserService;
