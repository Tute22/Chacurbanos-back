import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserStatus, UserDay } from './users.entity'
import { JWTtoken } from './users.token'
import { CreateUserDto } from './users.dto'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {
    constructor(
        private readonly jwtService: JWTtoken,
        @InjectModel('User') private readonly userModel: Model<User>
    ) {}

    async getAllUsers(): Promise<User[]> {
        return await this.userModel.find().exec()
    }

    async getUsersById(userId: string): Promise<User | null> {
        const userResult = await this.userModel.findById(userId).exec()

        if (!userResult) {
            throw new NotFoundException('Usuario no encontrado')
        }

        return userResult
    }

    async createUser(newUser: CreateUserDto): Promise<User> {
        const hashedPassword = bcrypt.hashSync(newUser.password, 10)

        const user = new this.userModel({
            ...newUser,
            password: hashedPassword,
            status: UserStatus.ENABLED,
            day: UserDay.PENDING,
            declaration: newUser.declaration || false,
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

    async resetDeclarationStatusForAllUsers(): Promise<void> {
        await this.userModel
            .updateMany({}, { $set: { declaration: false } })
            .exec()
    }
}
