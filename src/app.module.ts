import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { PackagesModule } from './packages/packages.module'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { HealthModule } from './health/health.module'

@Module({
    imports: [
        UsersModule,
        PackagesModule,
        HealthModule,
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGO_URI),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
