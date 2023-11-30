import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { UsersService } from '../services/users.service'
import { JWTtoken } from 'src/config/token'
import { CreateUserDto } from 'src/types/users.dto'

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtToken: JWTtoken
    ) {}

    @Get()
    allUsers() {
        return this.usersService.getAllUsers()
    }

    @Post()
    createNewUser(@Body() newUser: CreateUserDto) {
        return this.usersService.createUser(
            newUser.name,
            newUser.lastName,
            newUser.email,
            newUser.password
        )
    }

    @Post('login')
    loginUser(@Body() credentials: { email: string; password: string }) {
        return this.usersService.login(credentials.email, credentials.password)
    }

    @Get(':token')
    validateToken(@Param('token') token: string) {
        const decodedToken = this.jwtToken.validateToken(token)

        if (decodedToken) {
            return { decodedToken }
        } else {
            return { message: 'Token inválido' }
        }
    }
}
