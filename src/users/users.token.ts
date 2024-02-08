import * as jwt from 'jsonwebtoken'
import { Injectable } from '@nestjs/common'
import { UserPayload } from 'src/users/users.entity'

@Injectable()
export class JWTtoken {
    private readonly SECRET = 'milanwicheDeSanwinesa'

    generateToken(payload: UserPayload): string {
        return jwt.sign(payload, this.SECRET, { expiresIn: '2d' })
    }

    validateToken(token: string): UserPayload | null {
        try {
            const decoded = jwt.verify(token, this.SECRET) as UserPayload
            return decoded
        } catch {
            return null
        }
    }
}
//
