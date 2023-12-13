import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    HttpCode,
    HttpStatus,
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

    @Get(':_id')
    async getPackageById(@Param('_id') packageId: string) {
        return this.packagesService.getPackageById(packageId)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createNewPackage(@Body() newPackage: CreatePackagesDto) {
        return this.packagesService.createPackage(newPackage)
    }

    @Patch(':_id')
    @HttpCode(HttpStatus.CREATED)
    updatePackage(
        @Param('_id') packageId: string,
        @Body() updatedPackage: Partial<CreatePackagesDto>
    ) {
        const result = this.packagesService.updatePackage(
            packageId,
            updatedPackage
        )

        if (result) {
            return result
        } else {
            return { message: 'Package not found' }
        }
    }

    @Delete(':_id')
    deletePackage(@Param('_id') packageId: string) {
        const result = this.packagesService.deletePackage(packageId)

        if (result) {
            return { message: 'Package deleted' }
        } else {
            return { message: 'Package not found' }
        }
    }
}
