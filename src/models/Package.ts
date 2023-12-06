import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { PackageStatus } from 'src/packages/packages.entity'

@Schema()
export class Package {
    @Prop()
    address: string

    @Prop()
    to: string

    @Prop()
    weight: string

    @Prop()
    date: string

    @Prop({ default: PackageStatus.PENDING })
    status: PackageStatus
}

export const PackageSchema = SchemaFactory.createForClass(Package)
