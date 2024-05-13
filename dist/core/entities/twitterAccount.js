"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwitterAccount = void 0;
const uuid_1 = require("uuid");
class TwitterAccount {
    constructor(twitterAccountProperties) {
        this.props = twitterAccountProperties;
    }
    static create(props) {
        const twitterAccount = new TwitterAccount({
            id: (0, uuid_1.v4)(),
            username: props.username,
            email: props.email.trim().toLowerCase(),
            password: props.password,
            createdAt: new Date(),
        });
        return twitterAccount;
    }
}
exports.TwitterAccount = TwitterAccount;
//# sourceMappingURL=twitterAccount.js.map