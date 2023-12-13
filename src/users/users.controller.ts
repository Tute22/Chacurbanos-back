import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    HttpCode,
    HttpStatus,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { JWTtoken } from './users.token'
import { CreateUserDto } from 'src/users/users.dto'

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

    @Get('user/:_id')
    async getUsersById(@Param('_id') packageId: string) {
        return this.usersService.getUsersById(packageId)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createNewUser(@Body() newUser: CreateUserDto) {
        return this.usersService.createUser(newUser)
    }

    @Post('login')
    loginUser(@Body() credentials: { email: string; password: string }) {
        return this.usersService.login(credentials.email, credentials.password)
    }

    @Get(':token')
    validateToken(@Param('token') token: string) {
        const decodedToken = this.jwtToken.validateToken(token)

        if (decodedToken) {
            return decodedToken
        } else {
            return { message: 'Token inválido' }
        }
    }

    @Patch(':_id')
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
}
