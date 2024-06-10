import { TwitterAccount } from "../entities/twitterAccount";

export interface TwitterAccountRepository {
  save(TwitterAccount: TwitterAccount): Promise<void>;

  getById(id: string): Promise<TwitterAccount | null>;

  getByEmail(email: string): Promise<TwitterAccount | null>;

  update(twitterAccount: TwitterAccount): Promise<TwitterAccount>;
}
