"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const users_service_1 = require("../users/users.service");
const packages_service_1 = require("../packages/packages.service");
const users_entity_1 = require("../users/users.entity");
async function seed() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const usersService = app.get(users_service_1.UsersService);
    const packagesService = app.get(packages_service_1.PackagesService);
    const user1 = {
        name: 'Agustín',
        lastName: 'Sandoval',
        email: 'agustin@gmail.com',
        password: '12345678',
        role: users_entity_1.UserRole.DELIVERY,
        declaration: false,
    };
    const user2 = {
        name: 'Fiama',
        lastName: 'Talavera',
        email: 'fiama@gmail.com',
        password: '12345678',
        role: users_entity_1.UserRole.ADMIN,
        declaration: true,
    };
    const user3 = {
        name: 'Isidro',
        lastName: 'Molina',
        email: 'isidro@gmail.com',
        password: '12345678',
        role: users_entity_1.UserRole.DELIVERY,
        declaration: false,
    };
    const user4 = {
        name: 'Martin',
        lastName: 'Ferrando',
        email: 'martin@gmail.com',
        password: '12345678',
        role: users_entity_1.UserRole.DELIVERY,
        declaration: false,
    };
    const user5 = {
        name: 'Gastón',
        lastName: 'Rabinovich',
        email: 'gaston@gmail.com',
        password: '12345678',
        role: users_entity_1.UserRole.DELIVERY,
        declaration: false,
    };
    await usersService.createUser(user1);
    await usersService.createUser(user2);
    await usersService.createUser(user3);
    await usersService.createUser(user4);
    await usersService.createUser(user5);
    const package1 = {
        address: '123 Main St',
        recipient: 'Alice',
        weight: '5kg',
        date: new Date(),
    };
    const package2 = {
        address: '456 Oak St',
        recipient: 'Bob',
        weight: '3kg',
        date: new Date(),
    };
    await packagesService.createPackage(package1);
    await packagesService.createPackage(package2);
    console.log('Seed completed.');
    await app.close();
}
seed();
//# sourceMappingURL=seed.js.map