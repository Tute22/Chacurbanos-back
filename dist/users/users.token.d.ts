import { UserPayload } from 'src/users/users.entity';
export declare class JWTtoken {
    private readonly SECRET;
    generateToken(payload: UserPayload): string;
    validateToken(token: string): UserPayload | null;
}
