import { Model } from 'mongoose';
import { User } from './users.entity';
import { JWTtoken } from './users.token';
import { CreateUserDto } from './users.dto';
export declare class UsersService {
    private readonly jwtService;
    private readonly userModel;
    constructor(jwtService: JWTtoken, userModel: Model<User>);
    getAllUsers(): Promise<User[]>;
    getUsersById(userId: string): Promise<User | null>;
    createUser(newUser: CreateUserDto): Promise<User>;
    login(email: string, password: string): Promise<{
        user: User;
        token: string;
    } | null>;
    updateUser(userId: string, updatedUser: Partial<CreateUserDto>): Promise<User | null>;
}
