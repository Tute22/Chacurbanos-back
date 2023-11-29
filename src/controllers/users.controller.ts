import { Controller, Get, Post, Body } from '@nestjs/common'
import { UsersService } from '../services/users.service'
import { CreateUserDto } from 'src/types/users.dto'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    allUsers() {
        return this.usersService.getAllUsers()
    }

    @Post()
    createNewUser(@Body() newUser: CreateUserDto) {
        console.log(newUser)
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
}
