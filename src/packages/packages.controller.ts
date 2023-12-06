import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
} from '@nestjs/common'
import { CreatePackagesDto } from './packages.dto'
import { PackagesService } from './packages.service'

@Controller('packages')
export class PackagesController {
    constructor(private readonly packagesService: PackagesService) {}

    @Get()
    allPackages() {
        return this.packagesService.getAllPackages()
    }

    @Post()
    createNewPackage(@Body() newPackage: CreatePackagesDto) {
        return this.packagesService.createPackage(newPackage)
    }

    @Patch(':_id')
    updatePackage(
        @Param('_id') packageId: string,
        @Body() updatedPackage: Partial<CreatePackagesDto>
    ) {
        const result = this.packagesService.updatePackage(
            packageId,
            updatedPackage
        )

        if (result) {
            return { package: 'Paquete actualizado' }
        } else {
            return { message: 'Paquete no encontrado' }
        }
    }

    @Delete(':_id')
    deletePackage(@Param('_id') packageId: string) {
        const result = this.packagesService.deletePackage(packageId)

        if (result) {
            return { message: 'Paquete eliminado' }
        } else {
            return { message: 'Paquete no encontrado' }
        }
    }
}
