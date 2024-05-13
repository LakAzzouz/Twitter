"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Follow = void 0;
const uuid_1 = require("uuid");
class Follow {
    constructor(followProperties) {
        this.props = followProperties;
    }
    static create(props) {
        const follow = new Follow({
            idFollow: (0, uuid_1.v4)(),
            followedBy: props.followedBy,
            userId: props.userId,
            createAt: new Date()
        });
        return follow;
    }
}
exports.Follow = Follow;
//# sourceMappingURL=follow.js.map