import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { PackagesModule } from './packages/packages.module'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
    imports: [
        UsersModule,
        PackagesModule,
        MongooseModule.forRoot('mongodb://localhost/chacurbanosDB'),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
