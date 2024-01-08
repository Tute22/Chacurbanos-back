"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTtoken = void 0;
const jwt = require("jsonwebtoken");
const common_1 = require("@nestjs/common");
let JWTtoken = class JWTtoken {
    constructor() {
        this.SECRET = 'milanwicheDeSanwinesa';
    }
    generateToken(payload) {
        return jwt.sign(payload, this.SECRET, { expiresIn: '2d' });
    }
    validateToken(token) {
        try {
            const decoded = jwt.verify(token, this.SECRET);
            return decoded;
        }
        catch {
            return null;
        }
    }
};
exports.JWTtoken = JWTtoken;
exports.JWTtoken = JWTtoken = __decorate([
    (0, common_1.Injectable)()
], JWTtoken);
//# sourceMappingURL=users.token.js.map