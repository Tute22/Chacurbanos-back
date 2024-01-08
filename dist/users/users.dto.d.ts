import { UserRole } from './users.entity';
export declare class CreateUserDto {
    name: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole.ADMIN | UserRole.DELIVERY;
    declaration: boolean;
}
