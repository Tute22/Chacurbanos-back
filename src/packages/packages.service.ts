import { Injectable, NotFoundException } from '@nestjs/common'
import { Package, PackageStatus } from 'src/packages/packages.entity'
import { CreatePackagesDto } from './packages.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class PackagesService {
    constructor(
        @InjectModel('Package') private readonly packageModel: Model<Package>
    ) {}

    async getAllPackages(): Promise<Package[]> {
        return await this.packageModel.find().exec()
    }

    async getPackageById(packageId: string): Promise<Package | null> {
        const packageResult = await this.packageModel.findById(packageId).exec()

        if (!packageResult) {
            throw new NotFoundException('Paquete no encontrado')
        }

        return packageResult
    }

    async createPackage(newPackage: CreatePackagesDto): Promise<Package> {
        const createdPackage = new this.packageModel({
            ...newPackage,
            status: PackageStatus.PENDING,
        })

        return await createdPackage.save()
    }

    async updatePackage(
        packageId: string,
        updatedPackage: Partial<CreatePackagesDto>
    ): Promise<Package | null> {
        const packageToUpdate = await this.packageModel
            .findById(packageId)
            .exec()

        if (!packageToUpdate) {
            throw new NotFoundException('Paquete no encontrado')
        }

        Object.assign(packageToUpdate, updatedPackage)

        return await packageToUpdate.save()
    }

    async deletePackage(packageId: string): Promise<boolean> {
        const result = await this.packageModel
            .findByIdAndDelete(packageId)
            .exec()

        return result !== null
    }
}
