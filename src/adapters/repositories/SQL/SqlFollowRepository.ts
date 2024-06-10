import { Follow } from "../../../core/entities/follow";
import { FollowRepository } from "../../../core/repositories/FollowRepository";
import { Knex } from "knex";
import { SqlFollowMapper } from "../mappers/SqlFollowMapper";
import { FollowModel } from "../models/FollowModel";

export class SqlFollowRepository implements FollowRepository {
  constructor(
    private readonly knex: Knex,
    private readonly followMapper: SqlFollowMapper
  ) {}

  async save(follow: Follow): Promise<void> {
    const followModel = this.followMapper.fromDomain(follow);
    await this.knex.raw(
      `INSERT INTO follows (id_follow, followed_by, user_id, created_at, updated_at)
    VALUES (:id_follow, :followed_by, :user_id, :created_at, :updated_at)`,
      {
        id_follow: followModel.id_follow,
        followed_by: followModel.followed_by,
        user_id: followModel.user_id,
        created_at: followModel.created_at,
        updated_at: followModel.updated_at ? followModel.updated_at : null, //condition ternaire
      }
    );
  }

  async getById(id: string): Promise<Follow> {
    const followModel = await this.knex.raw<FollowModel[][]>(
      `SELECT * FROM follows WHERE id_follow = :id_follow LIMIT 1`,
      {
        id_follow: id,
      }
    );
    const follow = this.followMapper.toDomain(followModel[0][0]);

    return follow;
  }

  async getFollowedIds(followerId: string): Promise<string[]> {
    const followModel = await this.knex.raw<{user_id: string;}[][]>(
      `SELECT user_id FROM follows WHERE followed_by = :follower_id`, {
      follower_id: followerId,
    });
    return followModel[0].map((elm) => elm.user_id);
  }
}
