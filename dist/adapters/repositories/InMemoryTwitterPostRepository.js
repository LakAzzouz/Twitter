"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryTwitterPostRepository = void 0;
class InMemoryTwitterPostRepository {
    constructor(map) {
        this.map = map;
    }
    save(twitterPost) {
        return __awaiter(this, void 0, void 0, function* () {
            this.map.set(twitterPost.props.idPost, twitterPost);
            return twitterPost;
        });
    }
    getById(idPost) {
        return __awaiter(this, void 0, void 0, function* () {
            const twitterPost = this.map.get(idPost);
            if (!twitterPost) {
                throw new Error("Post not found !");
            }
            return twitterPost;
        });
    }
    getByFollowedIds(followedIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const twitterPosts = [];
            for (const followedId of followedIds) {
                const values = Array.from(this.map.values());
                const impactedPosts = values.filter((elem) => elem.props.userId === followedId);
                twitterPosts.push(...impactedPosts);
            }
            return twitterPosts;
        });
    }
    selectPostByTag(tag) {
        return __awaiter(this, void 0, void 0, function* () {
            const postArray = Array.from(this.map.values());
            const posts = postArray.filter(elm => elm.props.tag === tag);
            return posts;
        });
    }
}
exports.InMemoryTwitterPostRepository = InMemoryTwitterPostRepository;
//# sourceMappingURL=InMemoryTwitterPostRepository.js.map