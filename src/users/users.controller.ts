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
import { CreateUserDto } from './users.dto'
import { ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger'

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
    @ApiBody({
        description: 'User creation example.',
        type: CreateUserDto,
        examples: {
            default: {
                summary: 'Body for user creation example.',
                value: {
                    name: 'Isidro',
                    lastName: 'Merentiel',
                    email: 'isim@gmail.com',
                    password: '12345678',
                    role: 'admin',
                    declaration: true,
                },
            },
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Creates and returns a new user.',
    })
    @HttpCode(HttpStatus.CREATED)
    createNewUser(@Body() newUser: CreateUserDto) {
        return this.usersService.createUser(newUser)
    }

    @Post('login')
    @ApiBody({
        description: 'User sign in example.',
        type: CreateUserDto,
        examples: {
            default: {
                summary: 'Body for user login example.',
                value: {
                    email: 'isidro@gmail.com',
                    password: '12345678',
                },
            },
        },
    })
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
    @ApiBody({
        description: 'Updated user example.',
        type: CreateUserDto,
        examples: {
            default: {
                summary: 'Body for updating an user example.',
                value: {
                    email: 'matuidi2010@outlook.com',
                },
            },
        },
    })
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
}
