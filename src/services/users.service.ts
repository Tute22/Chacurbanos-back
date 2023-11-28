import { Injectable } from '@nestjs/common';
import { User, UserRole, UserStatus, UserDay } from '../types/users.entity';

Injectable({});
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'Fiama',
      lastName: 'Talavera',
      email: 'fiama@gmail.com',
      password: 'fiama12345678',
      role: UserRole.ADMIN,
      status: UserStatus.ENABLED,
      day: UserDay.PENDING,
      img: 'img',
    },
    {
      id: 2,
      name: 'Agustin',
      lastName: 'Sandoval',
      email: 'agustin@gmail.com',
      password: 'agustin12345678',
      role: UserRole.DELIVERY,
      status: UserStatus.ENABLED,
      day: UserDay.PENDING,
      img: 'img',
    },
    {
      id: 3,
      name: 'Gastón',
      lastName: 'Rabinovich',
      email: 'gaston@gmail.com',
      password: 'gaston12345678',
      role: UserRole.DELIVERY,
      status: UserStatus.ENABLED,
      day: UserDay.PENDING,
      img: 'img',
    },
    {
      id: 4,
      name: 'Martin',
      lastName: 'Ferrando',
      email: 'martin@gmail.com',
      password: 'martin12345678',
      role: UserRole.DELIVERY,
      status: UserStatus.ENABLED,
      day: UserDay.PENDING,
      img: 'img',
    },
    {
      id: 5,
      name: 'Isidro',
      lastName: 'Molina',
      email: 'isidro@gmail.com',
      password: 'isidro12345678',
      role: UserRole.DELIVERY,
      status: UserStatus.ENABLED,
      day: UserDay.PENDING,
      img: 'img',
    },
  ];

  getAllUsers() {
    return this.users;
  }

  createUser() {}
  updateUser() {}
}
