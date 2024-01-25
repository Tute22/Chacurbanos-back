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
        iconURL: '',
        name: 'Agustín',
        lastName: 'Sandoval',
        email: 'agustin@gmail.com',
        password: '12345678',
        role: UserRole.DELIVERY,
        declaration: false,
        dateBadDeclaration: '',
    }

    const user2: CreateUserDto = {
        iconURL: '',
        name: 'Fiama',
        lastName: 'Talavera',
        email: 'fiama@gmail.com',
        password: '12345678',
        role: UserRole.ADMIN,
        declaration: false,
        dateBadDeclaration: '',
    }

    const user3: CreateUserDto = {
        iconURL: '',
        name: 'Isidro',
        lastName: 'Molina',
        email: 'isidro@gmail.com',
        password: '12345678',
        role: UserRole.DELIVERY,
        declaration: false,
        dateBadDeclaration: '',
    }

    const user4: CreateUserDto = {
        iconURL: '',
        name: 'Martin',
        lastName: 'Ferrando',
        email: 'martin@gmail.com',
        password: '12345678',
        role: UserRole.DELIVERY,
        declaration: false,
        dateBadDeclaration: '',
    }

    const user5: CreateUserDto = {
        iconURL: '',
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
        address: 'Bokeeee',
        recipient: 'Alice',
        weight: 5,
        date: new Date(),
        deliveredBy: '',
    }

    const package2: CreatePackagesDto = {
        address: 'Bokita12',
        recipient: 'Bob',
        weight: 3,
        date: new Date(),
        deliveredBy: '',
    }

    await packagesService.createPackage(package1)
    await packagesService.createPackage(package2)

    console.log('Seed completed.')

    runScheduledTask()

    await app.close()
}

seed()
