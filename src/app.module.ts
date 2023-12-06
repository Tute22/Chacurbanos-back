import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { PackagesModule } from './packages/packages.module'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'

@Module({
    imports: [
        UsersModule,
        PackagesModule,
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGO_URI),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
