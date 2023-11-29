import { Module } from '@nestjs/common'
import { UsersController } from '../controllers/users.controller'
import { UsersService } from '../services/users.service'
import { JWTtoken } from 'src/config/token'

@Module({
    controllers: [UsersController],
    providers: [UsersService, JWTtoken],
})
export class UsersModule {}
