import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserRole, UserStatus, UserDay } from './users.entity'
import { JWTtoken } from './users.token'
import { CreateUserDto } from './users.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(
        private readonly jwtService: JWTtoken,
        @InjectModel('User') private readonly userModel: Model<User>
    ) {}

    async getAllUsers(): Promise<User[]> {
        return await this.userModel.find().exec()
    }

    async createUser(newUser: CreateUserDto): Promise<User> {
        const hashedPassword = bcrypt.hashSync(newUser.password, 10)

        const user = new this.userModel({
            ...newUser,
            password: hashedPassword,
            role: UserRole.DELIVERY,
            status: UserStatus.ENABLED,
            day: UserDay.PENDING,
        })

        return await user.save()
    }

    async login(
        email: string,
        password: string
    ): Promise<{ user: User; token: string } | null> {
        const user = await this.userModel.findOne({ email }).exec()

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

    async updateUser(
        userId: string,
        updatedUser: Partial<CreateUserDto>
    ): Promise<User | null> {
        const userToUpdate = await this.userModel.findById(userId).exec()

        if (!userToUpdate) {
            throw new NotFoundException('Usuario no encontrado')
        }

        Object.assign(userToUpdate, updatedUser)

        return await userToUpdate.save()
    }
}
