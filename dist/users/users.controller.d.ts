import { UsersService } from './users.service';
import { JWTtoken } from './users.token';
import { CreateUserDto } from './users.dto';
export declare class UsersController {
    private readonly usersService;
    private readonly jwtToken;
    constructor(usersService: UsersService, jwtToken: JWTtoken);
    allUsers(): Promise<import("./users.entity").User[]>;
    getUsersById(packageId: string): Promise<import("./users.entity").User>;
    createNewUser(newUser: CreateUserDto): Promise<import("./users.entity").User>;
    loginUser(credentials: {
        email: string;
        password: string;
    }): Promise<{
        user: import("./users.entity").User;
        token: string;
    }>;
    validateToken(token: string): import("./users.entity").UserPayload | {
        message: string;
    };
    updateUser(userId: string, updatedUser: Partial<CreateUserDto>): Promise<import("./users.entity").User> | {
        message: string;
    };
}
