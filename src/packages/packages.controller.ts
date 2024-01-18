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
import { ApiResponse, ApiTags } from '@nestjs/swagger'

@Controller('packages')
@ApiTags('packages')
export class PackagesController {
    constructor(private readonly packagesService: PackagesService) {}

    @Get()
    @ApiResponse({ status: 200, description: 'Returns all packages.' })
    allPackages() {
        return this.packagesService.getAllPackages()
    }

    @Get(':_id')
    @ApiResponse({
        status: 200,
        description: 'Returns a specific package by id.',
    })
    async getPackageById(@Param('_id') packageId: string) {
        return this.packagesService.getPackageById(packageId)
    }

    @Post()
    @ApiResponse({ status: 201, description: 'Creates a package.' })
    @HttpCode(HttpStatus.CREATED)
    createNewPackage(@Body() newPackage: CreatePackagesDto) {
        return this.packagesService.createPackage(newPackage)
    }

    @Patch(':_id')
    @ApiResponse({
        status: 201,
        description: 'Updates a specific package by id and returns it.',
    })
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
    @ApiResponse({
        status: 200,
        description: 'Deletes a specific package by id.',
    })
    deletePackage(@Param('_id') packageId: string) {
        const result = this.packagesService.deletePackage(packageId)

        if (result) {
            return { message: 'Package deleted' }
        } else {
            return { message: 'Package not found' }
        }
    }
}
