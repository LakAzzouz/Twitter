"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BCryptGateway = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class BCryptGateway {
    hashPassword(password, salt) {
        const hashedPassword = bcrypt_1.default.hashSync(password, salt);
        return hashedPassword;
    }
    compare(password, hashedPassword) {
        const isMatching = bcrypt_1.default.compareSync(password, hashedPassword);
        return isMatching;
    }
}
exports.BCryptGateway = BCryptGateway;
//# sourceMappingURL=BcryptGateway.js.map