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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_entity_1 = require("./users.entity");
const users_token_1 = require("./users.token");
const bcrypt = require("bcryptjs");
let UsersService = class UsersService {
    constructor(jwtService, userModel) {
        this.jwtService = jwtService;
        this.userModel = userModel;
    }
    async getAllUsers() {
        return await this.userModel.find().exec();
    }
    async getUsersById(userId) {
        const userResult = await this.userModel.findById(userId).exec();
        if (!userResult) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        return userResult;
    }
    async createUser(newUser) {
        const hashedPassword = bcrypt.hashSync(newUser.password, 10);
        const user = new this.userModel({
            ...newUser,
            password: hashedPassword,
            status: users_entity_1.UserStatus.ENABLED,
            day: users_entity_1.UserDay.PENDING,
            declaration: newUser.declaration || false,
        });
        return await user.save();
    }
    async login(email, password) {
        const user = await this.userModel.findOne({ email }).exec();
        if (!user) {
            throw new common_1.NotFoundException('Credenciales incorrectas');
        }
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) {
            throw new common_1.UnauthorizedException('Credenciales incorrectas');
        }
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
        };
        const token = this.jwtService.generateToken(payload);
        return { user, token };
    }
    async updateUser(userId, updatedUser) {
        const userToUpdate = await this.userModel.findById(userId).exec();
        if (!userToUpdate) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        Object.assign(userToUpdate, updatedUser);
        return await userToUpdate.save();
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [users_token_1.JWTtoken,
        mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map