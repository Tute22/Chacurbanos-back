import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { PackagesModule } from './packages/packages.module'

@Module({
    imports: [UsersModule, PackagesModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
