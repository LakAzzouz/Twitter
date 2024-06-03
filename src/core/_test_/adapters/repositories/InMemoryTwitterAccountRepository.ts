import { TwitterAccount } from "../../../entities/twitterAccount";
import { TwitterAccountRepository } from "../../../repositories/TwitterAccountRepository";

export class InMemoryTwitterAccountRepository implements TwitterAccountRepository {
  map: Map<String, TwitterAccount>;

  constructor(map: Map<String, TwitterAccount>) {
    this.map = map;
  }

  async save(twitterAccount: TwitterAccount): Promise<void> {
    this.map.set(twitterAccount.props.id, twitterAccount);
  }

  async getById(id: string): Promise<TwitterAccount> {
    const twitterAccount = this.map.get(id);
    if (!twitterAccount) {
      throw new Error("Twitter account not found !");
    }
    return twitterAccount;
  }

  async getByEmail(email: string): Promise<TwitterAccount | null> {
    const twitterAccount = Array.from(this.map.values());
    const twitterAccountExist = twitterAccount.find((twitterAccount) => twitterAccount.props.email === email.trim().toLowerCase());
    if (!twitterAccountExist) {
      return null;
    }
    return twitterAccountExist;
  }

  async getByIds(ids: string[]): Promise<TwitterAccount[]> {
    const twitterAccounts: TwitterAccount[] = [];
    for (const id of ids) {
      const twitterAccount = this.map.get(id);
      if (!twitterAccount) {
        throw new Error("Twitter account not found");
      }
      twitterAccounts.push(twitterAccount);
    }
    return twitterAccounts;
  }
}
