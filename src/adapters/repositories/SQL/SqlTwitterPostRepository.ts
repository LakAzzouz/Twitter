import { Knex } from "knex";
import { TwitterPost } from "../../../core/entities/twitterPost";
import { TwitterPostRepository } from "../../../core/repositories/TwitterPostRepository";
import { SqlTwitterPostMapper } from "../mappers/SqlTwitterPostMapper";
import { TwitterPostModel } from "../models/TwitterPostModel";

export class SqlTwitterPostRepository implements TwitterPostRepository {
  constructor(
    private readonly knex: Knex,
    private readonly twitterPostMapper: SqlTwitterPostMapper
  ) {}

  async save(twitterPost: TwitterPost): Promise<void> {
    const twitterPostModel = this.twitterPostMapper.fromDomain(twitterPost);
    await this.knex.raw(
      `INSERT INTO twitter_post (user_id, id_post, username, post, tag, created_at, updated_at)
      VALUES (:user_id, :id_post, :username, :post, :tag, :created_at, :updated_at)`,
      {
        user_id: twitterPostModel.user_id,
        id_post: twitterPostModel.id_post,
        username: twitterPostModel.username,
        post: twitterPostModel.post,
        tag: twitterPostModel.tag,
        created_at: twitterPostModel.created_at,
        updated_at: twitterPostModel.updated_at
          ? twitterPostModel.updated_at
          : null,
      }
    );
  }

  async getById(id: string): Promise<TwitterPost> {
    console.log(id)
    const twitterPostModel = await this.knex.raw<TwitterPostModel[][]>(
      `SELECT * FROM twitter_post WHERE id_post = :id_post`,
      {
        id_post: id,
      }
    );
    const twitterPost = this.twitterPostMapper.toDomain(twitterPostModel[0][0]);
    return twitterPost;
  }

  async selectPostByTag(tag: string): Promise<TwitterPost[]> {
    const result = await this.knex.raw<TwitterPostModel[][]>(
      `SELECT * FROM twitter_post WHERE tag = :tag`,
      {
        tag: tag,
      }
    );

    const twitterPostModels = result[0];

    const twitterPosts = twitterPostModels.map((elm) =>
      this.twitterPostMapper.toDomain(elm)
    );

    return twitterPosts;
  }

  async getByFollowedIds(ids: string[]): Promise<TwitterPost[]> {
    const result = await this.knex.raw<TwitterPostModel[][]>(
      `SELECT * FROM twitter_post WHERE user_id IN(${ids.map(() => '?').join(",")})`,
      ids
    );

    const twitterPostModels = result[0];

    const twitterPosts = twitterPostModels.map((elm) => this.twitterPostMapper.toDomain(elm));

    return twitterPosts;
  }
}
