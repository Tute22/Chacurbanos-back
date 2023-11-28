import { JwtPayload } from 'jsonwebtoken';

export enum UserRole {
  DELIVERY = 'delivery',
  ADMIN = 'admin',
}

export enum UserStatus {
  ENABLED = 'enabled',
  DISABLED = 'disabled',
}

export enum UserDay {
  NULL = null,
  PENDING = 'pending',
  IN_PROGRESS = 'in progress',
  FINISH = 'finish',
}

export class User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole.DELIVERY | UserRole.ADMIN;
  status: UserStatus.ENABLED;
  day: UserDay.PENDING;
  img: string;
}

type UserJWT = Pick<User, 'id' | 'email'>;

export type UserPayload = JwtPayload & UserJWT;
