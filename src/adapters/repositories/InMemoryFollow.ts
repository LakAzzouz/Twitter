import { Follow } from "../../core/entities/follow";
import { FollowRepository } from "../../core/repositories/FollowRepository";

export class InMemoryFollowRepository implements FollowRepository {
  map: Map<String, Follow>;

  constructor(map: Map<String, Follow>) {
    this.map = map;
  }

  async save(follow: Follow): Promise<Follow> {
    this.map.set(follow.props.idFollow, follow);
    return follow;
  }

  async getById(id: string): Promise<Follow> {
    const follow = this.map.get(id);
    if (!follow) {
      throw new Error("The follow was not found");
    }
    return follow;
  }

  async getFollowedIds(followerId: string): Promise<string[]> {
    const values = Array.from(this.map.values());
    const impactedFollows = values.filter((elem) => elem.props.followedBy === followerId);
    if (impactedFollows.length === 0) {
      return [];
    }
    const followedIds = impactedFollows.map((elem) => elem.props.userId);
    return followedIds;
  }
}
