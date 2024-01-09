import { ApiProperty } from '@nestjs/swagger'

export class CreatePackagesDto {
    @ApiProperty({
        description: "The recipient's address",
        example: '123 Main Street, City, Country',
    })
    address: string

    @ApiProperty({
        description: 'Name of the recipient',
        example: 'Luis Advincula',
    })
    recipient: string

    @ApiProperty({
        description: 'Weight of the package',
        example: 2,
        type: Number,
    })
    weight: number

    @ApiProperty({
        description: 'Date of the package shipment',
        example: '2024-01-15',
        type: Date,
    })
    date: Date
}
