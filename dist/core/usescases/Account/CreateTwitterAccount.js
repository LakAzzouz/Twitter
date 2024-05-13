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
exports.CreateTwitterAccount = void 0;
const twitterAccount_1 = require("../../entities/twitterAccount");
const Password_1 = require("../../valueObjects/Password");
class CreateTwitterAccount {
    constructor(_passwordGateway, _twitterAccountRepository) {
        this._passwordGateway = _passwordGateway;
        this._twitterAccountRepository = _twitterAccountRepository;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const twitterAccountAllReadyExist = yield this._twitterAccountRepository.getByEmail(input.email);
            if (twitterAccountAllReadyExist) {
                throw new Error("The mail exist");
            }
            const passwordValidated = Password_1.Password.passwordLength(input.password);
            const hashedPassword = this._passwordGateway.hashPassword(passwordValidated, 10);
            const twitterAccount = twitterAccount_1.TwitterAccount.create({
                username: input.username,
                email: input.email,
                password: hashedPassword,
            });
            this._twitterAccountRepository.save(twitterAccount);
            return twitterAccount;
        });
    }
}
exports.CreateTwitterAccount = CreateTwitterAccount;
//# sourceMappingURL=CreateTwitterAccount.js.map