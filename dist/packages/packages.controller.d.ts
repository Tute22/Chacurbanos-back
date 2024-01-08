import { CreatePackagesDto } from './packages.dto';
import { PackagesService } from './packages.service';
export declare class PackagesController {
    private readonly packagesService;
    constructor(packagesService: PackagesService);
    allPackages(): Promise<import("./packages.entity").Package[]>;
    getPackageById(packageId: string): Promise<import("./packages.entity").Package>;
    createNewPackage(newPackage: CreatePackagesDto): Promise<import("./packages.entity").Package>;
    updatePackage(packageId: string, updatedPackage: Partial<CreatePackagesDto>): Promise<import("./packages.entity").Package> | {
        message: string;
    };
    deletePackage(packageId: string): {
        message: string;
    };
}
