import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    HttpCode,
    HttpStatus,
    BadRequestException,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { JWTtoken } from './users.token'
import { CreateUserDto } from './users.dto'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { resetPasswordEmail } from '../config/repositories/mailer'
import * as bcrypt from 'bcryptjs'

@Controller('users')
@ApiTags('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtToken: JWTtoken
    ) {}

    @Get()
    @ApiResponse({ status: 200, description: 'Returns all users.' })
    allUsers() {
        return this.usersService.getAllUsers()
    }

    @Get('user/:_id')
    @ApiResponse({ status: 200, description: 'Returns an user by id.' })
    async getUsersById(@Param('_id') userId: string) {
        return this.usersService.getUsersById(userId)
    }

    @Post()
    @ApiResponse({
        status: 201,
        description: 'Creates and returns a new user.',
    })
    @HttpCode(HttpStatus.CREATED)
    async createNewUser(@Body() newUser: CreateUserDto) {
        try {
            if (!newUser.email) {
                throw new BadRequestException(
                    'Campos incompletos. Por favor, proporcione toda la información requerida.'
                )
            }

            const existingUser = await this.usersService.getUsersByEmail(
                newUser.email
            )

            if (existingUser) {
                throw new BadRequestException('Ese email ya esta registrado')
            }

            const createdUser = await this.usersService.createUser(newUser)
            return createdUser
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    @Post('login')
    @ApiResponse({ status: 200, description: 'Signs in an user.' })
    loginUser(@Body() credentials: { email: string; password: string }) {
        return this.usersService.login(credentials.email, credentials.password)
    }

    @Get(':token')
    @ApiResponse({ status: 200, description: 'Returns decoded token.' })
    validateToken(@Param('token') token: string) {
        const decodedToken = this.jwtToken.validateToken(token)

        if (decodedToken) {
            return decodedToken
        } else {
            return { message: 'Token inválido' }
        }
    }

    @Patch(':_id')
    @ApiResponse({
        status: 201,
        description: 'Updates the specific user by id and returns it',
    })
    @HttpCode(HttpStatus.CREATED)
    updateUser(
        @Param('_id') userId: string,
        @Body() updatedUser: Partial<CreateUserDto>
    ) {
        const result = this.usersService.updateUser(userId, updatedUser)

        if (result) {
            return result
        } else {
            return { message: 'Usuario no encontrado' }
        }
    }

    @Post('reset-password')
    @ApiResponse({ status: 200, description: 'Sends a password reset email.' })
    async resetPassword(@Body() resetRequest: { email: string }) {
        try {
            if (!resetRequest.email) {
                throw new BadRequestException('Campo email es requerido')
            }

            const user = await this.usersService.getUsersByEmail(
                resetRequest.email
            )

            if (!user) {
                throw new BadRequestException('Usuario no encontrado')
            }

            const payload = { id: user.id, email: user.email, role: user.role }
            const resetToken = this.jwtToken.generateToken(payload)

            resetPasswordEmail(user, resetToken)

            return { message: 'Correo de recuperación enviado correctamente.' }
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    @Patch('set-password/:registerToken')
    @ApiResponse({ status: 200, description: 'Sets a new password.' })
    async setPassword(
        @Param('registerToken') registerToken: string,
        @Body() setPasswordRequest: { password: string }
    ) {
        try {
            const decoded = this.jwtToken.validateToken(registerToken)

            const { id } = decoded

            const hashedPassword = await bcrypt.hash(
                setPasswordRequest.password,
                10
            )

            const userData = { password: hashedPassword }

            const result = await this.usersService.updateUser(id, userData)

            return result
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }
}
