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
exports.TwitterGetTag = void 0;
class TwitterGetTag {
    constructor(_twitterPostRepository) {
        this._twitterPostRepository = _twitterPostRepository;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const getByTag = this._twitterPostRepository.selectPostByTag(input.tag);
            return getByTag;
        });
    }
}
exports.TwitterGetTag = TwitterGetTag;
//# sourceMappingURL=TwitterGetByTag.js.map