"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserDay = exports.UserStatus = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["DELIVERY"] = "delivery";
    UserRole["ADMIN"] = "admin";
})(UserRole || (exports.UserRole = UserRole = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus["ENABLED"] = "enabled";
    UserStatus["DISABLED"] = "disabled";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
var UserDay;
(function (UserDay) {
    UserDay["PENDING"] = "pending";
    UserDay["IN_PROGRESS"] = "in progress";
    UserDay["FINISH"] = "finish";
})(UserDay || (exports.UserDay = UserDay = {}));
class User {
}
exports.User = User;
//# sourceMappingURL=users.entity.js.map