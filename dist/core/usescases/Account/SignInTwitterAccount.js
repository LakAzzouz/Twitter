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
exports.SignInTwitterAccount = void 0;
class SignInTwitterAccount {
    constructor(_passwordGateway, _twitterAccountRepository) {
        this._passwordGateway = _passwordGateway;
        this._twitterAccountRepository = _twitterAccountRepository;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const twitterAccount = yield this._twitterAccountRepository.getByEmail(input.email);
            if (!twitterAccount) {
                throw new Error("this mail doesn't exist");
            }
            const isMatching = this._passwordGateway.compare(input.password, twitterAccount.props.password);
            if (!isMatching) {
                throw new Error("The password is incorrect !");
            }
            return twitterAccount;
        });
    }
}
exports.SignInTwitterAccount = SignInTwitterAccount;
//# sourceMappingURL=SignInTwitterAccount.js.map