import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    ParseIntPipe,
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
        return this.packagesService.createPackage(
            newPackage.address,
            newPackage.to,
            newPackage.weight,
            newPackage.date
        )
    }

    @Patch(':id')
    updatePackage(
        @Param('id', ParseIntPipe) packageId: number,
        @Body() updatedPackage: Partial<CreatePackagesDto>
    ) {
        const result = this.packagesService.updatePackage(
            packageId,
            updatedPackage
        )

        if (result) {
            return { package: result }
        } else {
            return { message: 'Paquete no encontrado' }
        }
    }

    @Delete(':id')
    deletePackage(@Param('id', ParseIntPipe) packageId: number) {
        const result = this.packagesService.deletePackage(packageId)

        if (result) {
            return { package: result }
        } else {
            return { message: 'Paquete no encontrado' }
        }
    }
}
