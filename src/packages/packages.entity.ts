export enum PackageStatus {
    PENDING = 'pending',
    IN_PROGRESS = 'in progress',
    DELIVERED = 'delivered',
    DISABLED = 'disabled',
    DELIVERY = '',
}

export class Package {
    id: string
    address: string
    recipient: string
    weight: string
    date: Date
    deliveredBy: string
    status:
        | PackageStatus.DISABLED
        | PackageStatus.IN_PROGRESS
        | PackageStatus.DELIVERED
        | PackageStatus.PENDING
}
