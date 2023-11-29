import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common'
import { User, UserRole, UserStatus, UserDay } from '../types/users.entity'
import { JWTtoken } from 'src/config/token'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(private readonly jwtService: JWTtoken) {}

    private users: User[] = [
        {
            id: 1,
            name: 'Pablo',
            lastName: 'Hernandez',
            email: 'pablo@gmail.com',
            password:
                '$2b$10$4.TpONrHb5USgrMf780fPu335/WEY5Gz21mPDO7PJ6sn2JWEqeLwq',
            role: UserRole.DELIVERY,
            status: UserStatus.ENABLED,
            day: UserDay.PENDING,
        },
    ]

    getAllUsers(): User[] {
        return this.users
    }

    createUser(
        name: string,
        lastName: string,
        email: string,
        password: string
    ): User {
        const hashedPassword = bcrypt.hashSync(password, 10)

        const newUser: User = {
            id: this.users.length + 1,
            name,
            lastName,
            email,
            password: hashedPassword,
            role: UserRole.DELIVERY,
            status: UserStatus.ENABLED,
            day: UserDay.PENDING,
        }

        this.users.push(newUser)
        return newUser
    }

    login(
        email: string,
        password: string
    ): { user: User; token: string } | null {
        const user = this.users.find((u) => u.email === email)

        if (!user) {
            throw new NotFoundException('Credenciales incorrectas')
        }

        const passwordMatch = bcrypt.compareSync(password, user.password)

        if (!passwordMatch) {
            throw new UnauthorizedException('Credenciales incorrectas')
        }

        const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
            status: user.status,
            day: user.day,
        }
        const token = this.jwtService.generateToken(payload)

        return { user, token }
    }
}
