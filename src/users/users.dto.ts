import { UserRole } from './users.entity'
export class CreateUserDto {
    name: string
    lastName: string
    email: string
    password: string
    role: UserRole.ADMIN | UserRole.DELIVERY
    declaration: boolean
}
