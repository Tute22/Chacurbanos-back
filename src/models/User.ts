import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class User {
    @Prop()
    nombre: string

    @Prop()
    valor: number
}

export const UserSchema = SchemaFactory.createForClass(User)
