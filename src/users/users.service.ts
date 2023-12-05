import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common'
import { User, UserRole, UserStatus, UserDay } from './users.entity'
import { JWTtoken } from './users.token'
import { CreateUserDto } from './users.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(private readonly jwtService: JWTtoken) {}

    private users: User[] = [
        {
            id: 1,
            name: 'Fiama',
            lastName: 'Talavera',
            email: 'fiama@gmail.com',
            password:
                '$2b$10$dVrVNWmRFC1sHpoASN1bJe9cAbwmSlxZN7EAYWRzrOr8cR745EiUa',
            role: UserRole.ADMIN,
            status: UserStatus.ENABLED,
            day: UserDay.NULL,
        },
        {
            id: 2,
            name: 'Agustin',
            lastName: 'Sandoval',
            email: 'agustin@gmail.com',
            password:
                '$2b$10$ehoq9wY2Nay1DI.5blJYoee63nX5VgdroTO/7AZte.MhfuTYVykw.',
            role: UserRole.DELIVERY,
            status: UserStatus.ENABLED,
            day: UserDay.PENDING,
        },
        {
            id: 3,
            name: 'Martin',
            lastName: 'Ferrando',
            email: 'martin@gmail.com',
            password:
                '$2b$10$yrDT7H9ocV43NBYAolRop.QJgA1u7CZ.nUpmKQKDO1SHbi2e2KzaK',
            role: UserRole.DELIVERY,
            status: UserStatus.ENABLED,
            day: UserDay.PENDING,
        },
        {
            id: 4,
            name: 'Isidro',
            lastName: 'Molina',
            email: 'isidro@gmail.com',
            password:
                '$2b$10$RVDT6uUkqjnwJoMMO2YziuXm290BjFPeUTQWKNwwEThSw2HZiH212',
            role: UserRole.DELIVERY,
            status: UserStatus.ENABLED,
            day: UserDay.PENDING,
        },
        {
            id: 5,
            name: 'Gastón',
            lastName: 'Rabinovich',
            email: 'gaston@gmail.com',
            password:
                '$2b$10$TioUa8fbUCP5tBZV7tJGwOW.3uTpm7kqkJcspccXMXcZqs2.LDIwC',
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
        }
        const token = this.jwtService.generateToken(payload)

        return { user, token }
    }

    updateUser(
        userId: number,
        updatedUser: Partial<CreateUserDto>
    ): User | null {
        const userToUpdate = this.users.find((u) => u.id === userId)

        Object.assign(userToUpdate, updatedUser)

        this.users[userId - 1] = userToUpdate

        return userToUpdate
    }
}