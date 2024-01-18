import { UserRole } from './users.entity'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
    @ApiProperty({
        description: "The user's name.",
        example: 'Martín',
    })
    name: string

    @ApiProperty({
        description: "The user's last name.",
        example: 'Palermo',
    })
    lastName: string

    @ApiProperty({
        description: "The user's email.",
        example: 'facha@gmail.com',
    })
    email: string

    @ApiProperty({
        description: "The user's hashed password.",
        example: '$2a$10$4gG6IZkaPbFxGLjL2c3WKOdDXNH5mciFXml/F7SrNJqgsgqjRxrUy',
    })
    password: string

    @ApiProperty({
        description: "The user's role.",
        example: 'delivery',
    })
    role: UserRole.ADMIN | UserRole.DELIVERY

    @ApiProperty({
        description:
            'Determines if the user agrees with the sworn declaration.',
        example: true,
    })
    declaration: boolean

    @ApiProperty({
        description:
            'Determines the date on which the user was disabled for incorrectly completing the declaration.',
        example:
            'Wed Jan 17 2024 16:40:11 GMT-0300 (hora estándar de Argentina)',
    })
    dateBadDeclaration: string
}
