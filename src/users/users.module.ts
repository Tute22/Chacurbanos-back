import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { JWTtoken } from './users.token'
import { UserSchema } from '../models/User'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ],
    controllers: [UsersController],
    providers: [UsersService, JWTtoken],
})
export class UsersModule {}
//
