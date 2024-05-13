"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Twitte = void 0;
class Twitte {
    constructor(value) {
        this.value = value;
    }
    static characterLimit(value) {
        if (value.length > 280) {
            throw new Error("The post must not contain more than 280 characters");
        }
        return value;
    }
}
exports.Twitte = Twitte;
//# sourceMappingURL=TwitterPost.js.map