export declare enum UserRole {
    DELIVERY = "delivery",
    ADMIN = "admin"
}
export declare enum UserStatus {
    ENABLED = "enabled",
    DISABLED = "disabled"
}
export declare enum UserDay {
    PENDING = "pending",
    IN_PROGRESS = "in progress",
    FINISH = "finish"
}
export declare class User {
    id: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole.DELIVERY | UserRole.ADMIN;
    status: UserStatus.ENABLED | UserStatus.DISABLED;
    day: UserDay.PENDING | UserDay.IN_PROGRESS | UserDay.FINISH;
    iconUrl: string;
    declaration: boolean;
}
export type UserPayload = {
    id: number;
    email: string;
    role: UserRole;
};
