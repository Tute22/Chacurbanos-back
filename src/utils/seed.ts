import { NestFactory } from '@nestjs/core'
import { AppModule } from '../app.module'
import { UsersService } from '../users/users.service'
import { PackagesService } from '../packages/packages.service'
import { CreatePackagesDto } from '../packages/packages.dto'
import { CreateUserDto } from '../users/users.dto'
import { UserRole } from '../users/users.entity'
import { runScheduledTask } from './scheduler'

async function seed() {
    const app = await NestFactory.create(AppModule)
    const usersService = app.get(UsersService)
    const packagesService = app.get(PackagesService)

    // Seed Users
    const user1: CreateUserDto = {
        iconUrl:
            'https://res.cloudinary.com/dpbr1u8z5/image/upload/v1707343673/mskdfdokbbjkgfuoxlnl.png',
        name: 'Agustín',
        lastName: 'Sandoval',
        email: 'agustin@gmail.com',
        password: '12345678',
        role: UserRole.DELIVERY,
        declaration: false,
        dateBadDeclaration: '',
    }

    const user2: CreateUserDto = {
        iconUrl:
            'https://res.cloudinary.com/dpbr1u8z5/image/upload/v1707343519/aucftjbreczdi6jy4rzy.png',
        name: 'Fiama',
        lastName: 'Talavera',
        email: 'fiama@gmail.com',
        password: '12345678',
        role: UserRole.ADMIN,
        declaration: false,
        dateBadDeclaration: '',
    }

    const user3: CreateUserDto = {
        iconUrl:
            'https://res.cloudinary.com/dpbr1u8z5/image/upload/v1707343726/b5abauyxyhk1eajv26sk.png',
        name: 'Isidro',
        lastName: 'Molina',
        email: 'isidro@gmail.com',
        password: '12345678',
        role: UserRole.DELIVERY,
        declaration: false,
        dateBadDeclaration: '',
    }

    const user4: CreateUserDto = {
        iconUrl:
            'https://res.cloudinary.com/dpbr1u8z5/image/upload/v1707343445/gxfrkfjexe5kaazv9gxd.png',
        name: 'Martin',
        lastName: 'Ferrando',
        email: 'martin@gmail.com',
        password: '12345678',
        role: UserRole.DELIVERY,
        declaration: false,
        dateBadDeclaration: '',
    }

    const user5: CreateUserDto = {
        iconUrl:
            'https://res.cloudinary.com/dpbr1u8z5/image/upload/v1707343861/ebggzcls8hp6glvmbnrh.png',
        name: 'Gastón',
        lastName: 'Rabinovich',
        email: 'gaston@gmail.com',
        password: '12345678',
        role: UserRole.DELIVERY,
        declaration: false,
        dateBadDeclaration: '',
    }

    await usersService.createUser(user1)
    await usersService.createUser(user2)
    await usersService.createUser(user3)
    await usersService.createUser(user4)
    await usersService.createUser(user5)

    // Seed Packages
    const package1: CreatePackagesDto = {
        address: 'José Hernández 166, H3500 Resistencia, Chaco',
        recipient: 'Barbara',
        weight: 5,
        date: new Date(),
        deliveredBy: '',
    }

    const package2: CreatePackagesDto = {
        address: 'Av. Wilde 146, H3500BTO Resistencia, Chaco',
        recipient: 'Alfredo',
        weight: 3,
        date: new Date(),
        deliveredBy: '',
    }

    const package3: CreatePackagesDto = {
        address: 'C. Monteagudo 1465, H3508EHN Resistencia, Chaco',
        recipient: 'Juan',
        weight: 3,
        date: new Date(),
        deliveredBy: '',
    }

    const package4: CreatePackagesDto = {
        address: 'Arturo Illia 644, H3500AKH Resistencia, Chaco',
        recipient: 'Estela',
        weight: 3,
        date: new Date(),
        deliveredBy: '',
    }

    const package5: CreatePackagesDto = {
        address: 'Juan Domingo Perón 1451, H3506KLO Resistencia, Chaco',
        recipient: 'Luis',
        weight: 3,
        date: new Date(),
        deliveredBy: '',
    }

    await packagesService.createPackage(package1)
    await packagesService.createPackage(package2)
    await packagesService.createPackage(package3)
    await packagesService.createPackage(package4)
    await packagesService.createPackage(package5)

    console.log('Seed completed.')

    runScheduledTask()

    await app.close()
}

seed()
