import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { JWTtoken } from './users.token'

@Module({
    controllers: [UsersController],
    providers: [UsersService, JWTtoken],
})
export class UsersModule {}
