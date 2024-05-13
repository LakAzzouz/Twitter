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
exports.FollowAccount = void 0;
const follow_1 = require("../../entities/follow");
class FollowAccount {
    constructor(_twitterFollowRepository, _twitterAccountRepository) {
        this._twitterFollowRepository = _twitterFollowRepository;
        this._twitterAccountRepository = _twitterAccountRepository;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const follow = follow_1.Follow.create({
                followedBy: input.followedBy,
                userId: input.userId
            });
            yield this._twitterAccountRepository.getByIds([input.followedBy, input.userId]);
            this._twitterFollowRepository.save(follow);
            return follow;
        });
    }
}
exports.FollowAccount = FollowAccount;
//# sourceMappingURL=FollowAccount.js.map