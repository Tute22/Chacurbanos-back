export enum PackageStatus {
    PENDING = 'pending',
    IN_PROGRESS = 'in progress',
    DELIVERED = 'delivered',
}

export class Package {
    id: string
    address: string
    to: string
    weight: string
    date: Date
    status:
        | PackageStatus.PENDING
        | PackageStatus.IN_PROGRESS
        | PackageStatus.DELIVERED
}
