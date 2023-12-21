export enum PackageStatus {
    PENDING = 'pending',
    IN_PROGRESS = 'in progress',
    DELIVERED = 'delivered',
    DISABLED = 'disabled',
}

export class Package {
    id: string
    address: string
    recipient: string
    weight: string
    date: Date
    status:
        | PackageStatus.PENDING
        | PackageStatus.IN_PROGRESS
        | PackageStatus.DELIVERED
        | PackageStatus.DISABLED
}
