import { NestFactory } from '@nestjs/core'
import { AppModule } from '../app.module'
import { UsersService } from '../users/users.service'
import { PackagesService } from '../packages/packages.service'
import { CreatePackagesDto } from '../packages/packages.dto'
import { CreateUserDto } from '../users/users.dto'
import { UserRole } from '../users/users.entity'

async function seed() {
    const app = await NestFactory.create(AppModule)
    const usersService = app.get(UsersService)
    const packagesService = app.get(PackagesService)

    // Seed Users
    const user1: CreateUserDto = {
        name: 'Agustín',
        lastName: 'Sandoval',
        email: 'agustin@gmail.com',
        password: '12345678',
        role: UserRole.DELIVERY,
        declaration: false,
    }

    const user2: CreateUserDto = {
        name: 'Fiama',
        lastName: 'Talavera',
        email: 'fiama@gmail.com',
        password: '12345678',
        role: UserRole.ADMIN,
        declaration: true,
    }

    const user3: CreateUserDto = {
        name: 'Isidro',
        lastName: 'Molina',
        email: 'isidro@gmail.com',
        password: '12345678',
        role: UserRole.DELIVERY,
        declaration: false,
    }

    const user4: CreateUserDto = {
        name: 'Martin',
        lastName: 'Ferrando',
        email: 'martin@gmail.com',
        password: '12345678',
        role: UserRole.DELIVERY,
        declaration: false,
    }

    const user5: CreateUserDto = {
        name: 'Gastón',
        lastName: 'Rabinovich',
        email: 'gaston@gmail.com',
        password: '12345678',
        role: UserRole.DELIVERY,
        declaration: false,
    }

    await usersService.createUser(user1)
    await usersService.createUser(user2)
    await usersService.createUser(user3)
    await usersService.createUser(user4)
    await usersService.createUser(user5)

    // Seed Packages
    const package1: CreatePackagesDto = {
        address: '123 Main St',
        recipient: 'Alice',
        weight: 5,
        date: new Date(),
    }

    const package2: CreatePackagesDto = {
        address: '456 Oak St',
        recipient: 'Bob',
        weight: 3,
        date: new Date(),
    }

    await packagesService.createPackage(package1)
    await packagesService.createPackage(package2)

    console.log('Seed completed.')
    await app.close()
}

seed()
