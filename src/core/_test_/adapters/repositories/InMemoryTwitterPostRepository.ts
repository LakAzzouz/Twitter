import { TwitterPost } from "../../../entities/twitterPost";
import { TwitterPostRepository } from "../../../repositories/TwitterPostRepository";

export class InMemoryTwitterPostRepository implements TwitterPostRepository {
  map: Map<String, TwitterPost>;

  constructor(map: Map<String, TwitterPost>) {
    this.map = map;
  }

  async save(twitterPost: TwitterPost): Promise<void> {
    this.map.set(twitterPost.props.idPost, twitterPost);
  }

  async getById(idPost: string): Promise<TwitterPost> {
    const twitterPost = this.map.get(idPost);
    if (!twitterPost) {
      throw new Error("Post not found !");
    }
    return twitterPost;
  }

  async getByFollowedIds(followedIds: string[]): Promise<TwitterPost[]> {
    const twitterPosts = [];
    for (const followedId of followedIds) {
      const values = Array.from(this.map.values());
      console.log(values)
      const impactedPosts = values.filter((elem) => elem.props.userId === followedId);
      twitterPosts.push(...impactedPosts);
    }
    return twitterPosts;
  }

  async selectPostByTag(tag: string): Promise<TwitterPost[]> {
    const postArray = Array.from(this.map.values());
    const posts = postArray.filter((elm) => elm.props.tag === tag);
    return posts;
  }
}
