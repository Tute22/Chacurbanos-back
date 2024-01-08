export declare enum PackageStatus {
    PENDING = "pending",
    IN_PROGRESS = "in progress",
    DELIVERED = "delivered",
    DISABLED = "disabled"
}
export declare class Package {
    id: string;
    address: string;
    recipient: string;
    weight: string;
    date: Date;
    status: PackageStatus.DISABLED | PackageStatus.IN_PROGRESS | PackageStatus.DELIVERED | PackageStatus.PENDING;
}
