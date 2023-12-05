import { Injectable, NotFoundException } from '@nestjs/common'
import { Package, PackageStatus } from 'src/packages/packages.entity'
import { CreatePackagesDto } from './packages.dto'

@Injectable()
export class PackagesService {
    constructor() {}

    private packages: Package[] = [
        {
            id: 1,
            address: 'Castillo 1356, CABA',
            status: null,
            to: 'Luciano Acosta',
            weight: '13',
            date: new Date('2023-01-01T12:00:00Z'),
        },
        {
            id: 2,
            address: 'AV. Carabobo y Rivadavia, CABA',
            status: null,
            to: 'Nestor Ortigoza',
            weight: '15',
            date: new Date('2023-01-01T12:00:00Z'),
        },
        {
            id: 3,
            address: 'Mendoza 1810, CABA',
            status: null,
            to: 'Yamila Rodriguez',
            weight: '48',
            date: new Date('2023-01-01T12:00:00Z'),
        },
        {
            id: 4,
            address: 'Scalabrini Ortiz 5073, CABA',
            status: null,
            to: 'Estefanía Bannini',
            weight: '36',
            date: new Date('2023-01-01T12:00:00Z'),
        },
        {
            id: 5,
            address: 'Amenabar 2100, CABA',
            status: null,
            to: 'Alan Varela',
            weight: '25',
            date: new Date('2023-01-01T12:00:00Z'),
        },
        {
            id: 6,
            address: 'Melian 1242, CABA',
            status: null,
            to: 'Cristian Medina',
            weight: '22',
            date: new Date('2023-01-01T12:00:00Z'),
        },
        {
            id: 7,
            address: 'Av. Gral. Mosconi 1056, CABA',
            status: null,
            to: 'Valentín Barco',
            weight: '9',
            date: new Date('2023-01-01T12:00:00Z'),
        },
        {
            id: 8,
            address: 'Av. Callao 1441, CABA',
            status: null,
            to: 'Vanina Correa',
            weight: '20',
            date: new Date('2023-01-01T12:00:00Z'),
        },
        {
            id: 9,
            address: 'Reconquista 2549, CABA',
            status: null,
            to: 'Lautaro Martinez',
            weight: '18',
            date: new Date('2023-01-01T12:00:00Z'),
        },
        {
            id: 10,
            address: 'Maipú 962, CABA',
            status: null,
            to: 'Julian Alvarez',
            weight: '52',
            date: new Date('2023-01-01T12:00:00Z'),
        },
        {
            id: 11,
            address: 'Montevideo 1581, CABA',
            status: null,
            to: 'Marcos Acuña',
            weight: '38',
            date: new Date('2023-01-01T12:00:00Z'),
        },
        {
            id: 12,
            address: 'Av. Juan B. Justo 2891, CABA',
            status: null,
            to: 'Emiliano Martinez',
            weight: '22',
            date: new Date('2023-01-01T12:00:00Z'),
        },
    ]

    getAllPackages(): Package[] {
        return this.packages
    }

    createPackage(
        address: string,
        to: string,
        weight: string,
        date: Date
    ): Package {
        const newPackage: Package = {
            id: this.packages.length + 1,
            address,
            to,
            weight,
            date,
            status: PackageStatus.NULL,
        }

        this.packages.push(newPackage)
        return newPackage
    }

    updatePackage(
        packageId: number,
        updatedPackage: Partial<CreatePackagesDto>
    ): Package | null {
        const packageToUpdate = this.packages.find((u) => u.id === packageId)

        Object.assign(packageToUpdate, updatedPackage)

        this.packages[packageId - 1] = packageToUpdate

        return packageToUpdate
    }

    deletePackage(packageId: number) {
        const packageToDelete = this.packages[packageId - 1]

        if (!packageToDelete) {
            throw new NotFoundException('Paquete no encontrado')
        }

        this.packages.splice(packageId - 1, 1)
        return packageToDelete
    }
}
