export enum UserRole {
    DELIVERY = 'delivery',
    ADMIN = 'admin',
}

export enum UserStatus {
    ENABLED = 'enabled',
    DISABLED = 'disabled',
}

export enum UserDay {
    PENDING = 'pending',
    IN_PROGRESS = 'in progress',
    FINISH = 'finish',
}

export class User {
    id: string
    name: string
    lastName: string
    email: string
    password: string
    role: UserRole.DELIVERY | UserRole.ADMIN
    status: UserStatus.ENABLED | UserStatus.DISABLED
    day: UserDay.PENDING | UserDay.IN_PROGRESS | UserDay.FINISH
    iconUrl: string
    declaration: boolean
    dateBadDeclaration: string
}

export type UserPayload = {
    id: string
    email: string
    role: UserRole
}
