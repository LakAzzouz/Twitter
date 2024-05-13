"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Password = void 0;
class Password {
    constructor(value) {
        this.value = value;
    }
    static passwordLength(value) {
        if (value.length < 5) {
            throw new Error("The password was too short");
        }
        if (value.length > 11) {
            throw new Error("The password was too long");
        }
        return value;
    }
}
exports.Password = Password;
//# sourceMappingURL=Password.js.map