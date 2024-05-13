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
exports.InMemoryTwitterAccountRepository = void 0;
class InMemoryTwitterAccountRepository {
    constructor(map) {
        this.map = map;
    }
    save(twitterAccount) {
        return __awaiter(this, void 0, void 0, function* () {
            this.map.set(twitterAccount.props.id, twitterAccount);
            return twitterAccount;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const twitterAccount = this.map.get(id);
            if (!twitterAccount) {
                throw new Error("Twitter account not found !");
            }
            return twitterAccount;
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const twitterAccount = Array.from(this.map.values());
            const twitterAccountExist = twitterAccount.find((twitterAccount) => twitterAccount.props.email === email.trim().toLowerCase());
            if (!twitterAccountExist) {
                return null;
            }
            return twitterAccountExist;
        });
    }
    getByIds(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const twitterAccounts = [];
            for (const id of ids) {
                const twitterAccount = this.map.get(id);
                if (!twitterAccount) {
                    throw new Error("Twitter account not found");
                }
                twitterAccounts.push(twitterAccount);
            }
            return twitterAccounts;
        });
    }
}
exports.InMemoryTwitterAccountRepository = InMemoryTwitterAccountRepository;
//# sourceMappingURL=InMemoryTwitterAccountRepository.js.map