"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackagesService = void 0;
const common_1 = require("@nestjs/common");
const packages_entity_1 = require("./packages.entity");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let PackagesService = class PackagesService {
    constructor(packageModel) {
        this.packageModel = packageModel;
    }
    async getAllPackages() {
        return await this.packageModel.find().exec();
    }
    async getPackageById(packageId) {
        const packageResult = await this.packageModel.findById(packageId).exec();
        if (!packageResult) {
            throw new common_1.NotFoundException('Paquete no encontrado');
        }
        return packageResult;
    }
    async createPackage(newPackage) {
        const createdPackage = new this.packageModel({
            ...newPackage,
            status: packages_entity_1.PackageStatus.DISABLED,
        });
        return await createdPackage.save();
    }
    async updatePackage(packageId, updatedPackage) {
        const packageToUpdate = await this.packageModel
            .findById(packageId)
            .exec();
        if (!packageToUpdate) {
            throw new common_1.NotFoundException('Paquete no encontrado');
        }
        Object.assign(packageToUpdate, updatedPackage);
        return await packageToUpdate.save();
    }
    async deletePackage(packageId) {
        const result = await this.packageModel
            .findByIdAndDelete(packageId)
            .exec();
        return result !== null;
    }
};
exports.PackagesService = PackagesService;
exports.PackagesService = PackagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Package')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PackagesService);
//# sourceMappingURL=packages.service.js.map