export enum PackageStatus {
    NULL = null,
    PENDING = 'pending',
    DELIVERED = 'delivered',
}

export class Package {
    id: number
    address: string
    to: string
    weight: string
    date: Date
    status: PackageStatus.NULL | PackageStatus.PENDING | PackageStatus.DELIVERED
}
