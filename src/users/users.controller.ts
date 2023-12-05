import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    ParseIntPipe,
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

    @Patch(':id')
    updateUser(
        @Param('id', ParseIntPipe) userId: number,
        @Body() updatedUser: Partial<CreateUserDto>
    ) {
        const result = this.usersService.updateUser(userId, updatedUser)

        if (result) {
            return { user: result }
        } else {
            return { message: 'Usuario no encontrado' }
        }
    }
}
