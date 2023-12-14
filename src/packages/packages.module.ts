import { Module } from '@nestjs/common'
import { PackagesController } from './packages.controller'
import { PackagesService } from './packages.service'
import { PackageSchema } from '../models/Package'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Package', schema: PackageSchema }]),
    ],
    controllers: [PackagesController],
    providers: [PackagesService],
})
export class PackagesModule {}
