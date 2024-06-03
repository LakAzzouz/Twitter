import { TwitterPost } from "../entities/twitterPost";

export interface TwitterPostRepository {
  save(twitterPost: TwitterPost): Promise<void>;

  getById(id: string): Promise<TwitterPost>;

  selectPostByTag(tag: string): Promise<TwitterPost[]>;
}
