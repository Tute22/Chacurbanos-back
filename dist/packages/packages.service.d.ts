import { Package } from './packages.entity';
import { CreatePackagesDto } from './packages.dto';
import { Model } from 'mongoose';
export declare class PackagesService {
    private readonly packageModel;
    constructor(packageModel: Model<Package>);
    getAllPackages(): Promise<Package[]>;
    getPackageById(packageId: string): Promise<Package | null>;
    createPackage(newPackage: CreatePackagesDto): Promise<Package>;
    updatePackage(packageId: string, updatedPackage: Partial<CreatePackagesDto>): Promise<Package | null>;
    deletePackage(packageId: string): Promise<boolean>;
}
