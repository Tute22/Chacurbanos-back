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
    BadRequestException,
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
    async createNewPackage(@Body() newPackage: CreatePackagesDto) {
        // return this.packagesService.createPackage(newPackage)
        try {
            const createdPackage =
                this.packagesService.createPackage(newPackage)
            return createdPackage
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message, // Puedes personalizar el mensaje de acuerdo a tu aplicación
            }
        }
    }

    @Patch(':_id')
    @ApiResponse({
        status: 201,
        description: 'Updates a specific package by id and returns it.',
    })
    @HttpCode(HttpStatus.CREATED)
    async updatePackage(
        @Param('_id') packageId: string,
        @Body() updatedPackage: Partial<CreatePackagesDto>
    ) {
        try {
            const properties = [
                'address',
                'recipient',
                'weigth',
                'date',
                'status',
            ]
            const packagePropertie = Object.keys(updatedPackage)[0]

            const findPackageById =
                await this.packagesService.getPackageById(packageId)

            if (!findPackageById) {
                throw new BadRequestException('Paquete no encontrado')
            }

            if (!properties.includes(packagePropertie)) {
                throw new BadRequestException('Propiedades Incorrectas')
            }

            const result = await this.packagesService.updatePackage(
                packageId,
                updatedPackage
            )

            return result
        } catch (error) {
            throw new BadRequestException(error.message)
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

//
