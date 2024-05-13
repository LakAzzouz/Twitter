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
exports.InMemoryFollowRepository = void 0;
class InMemoryFollowRepository {
    constructor(map) {
        this.map = map;
    }
    save(follow) {
        return __awaiter(this, void 0, void 0, function* () {
            this.map.set(follow.props.idFollow, follow);
            return follow;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const follow = this.map.get(id);
            if (!follow) {
                throw new Error("The follow was not found");
            }
            return follow;
        });
    }
    getFollowedIds(followerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const values = Array.from(this.map.values());
            const impactedFollows = values.filter((elem) => elem.props.followedBy === followerId);
            if (impactedFollows.length === 0) {
                return [];
            }
            const followedIds = impactedFollows.map((elem) => elem.props.userId);
            return followedIds;
        });
    }
}
exports.InMemoryFollowRepository = InMemoryFollowRepository;
//# sourceMappingURL=InMemoryFollow.js.map