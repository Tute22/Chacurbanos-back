import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { UserRole, UserStatus, UserDay } from '../users/users.entity'

@Schema()
export class User {
    @Prop()
    iconUrl: string

    @Prop()
    name: string

    @Prop()
    lastName: string

    @Prop()
    email: string

    @Prop()
    password: string

    @Prop({ default: UserRole.DELIVERY })
    role: UserRole

    @Prop({ default: UserStatus.ENABLED })
    status: UserStatus

    @Prop({ default: UserDay.PENDING })
    day: UserDay

    @Prop({ default: false })
    declaration: boolean
}

export const UserSchema = SchemaFactory.createForClass(User)
