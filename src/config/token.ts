import jwt from 'jsonwebtoken';
import { UserPayload } from 'src/types/users.entity';

const SECRET = 'milanwicheDeSanwinesa';

export class JWTtoken {
  static generateToken(payload: UserPayload) {
    return jwt.sign(payload, SECRET);
  }

  static validateToken(token: string): UserPayload | null {
    try {
      const decoded = jwt.verify(token, SECRET);
      if (typeof decoded === 'object' && decoded !== null) {
        return decoded as UserPayload;
      }
      return null;
    } catch {
      return null;
    }
  }
}
