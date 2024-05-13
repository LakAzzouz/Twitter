"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwitterPost = void 0;
const uuid_1 = require("uuid");
class TwitterPost {
    constructor(twitterPostProperties) {
        this.props = twitterPostProperties;
    }
    static create(props) {
        const twitterPost = new TwitterPost({
            userId: props.userId,
            idPost: (0, uuid_1.v4)(),
            username: props.username,
            post: props.post,
            tag: props.tag,
            createdAt: new Date(),
        });
        return twitterPost;
    }
}
exports.TwitterPost = TwitterPost;
//# sourceMappingURL=twitterPost.js.map