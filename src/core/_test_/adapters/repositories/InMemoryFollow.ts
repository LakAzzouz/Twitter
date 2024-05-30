import { Follow } from "../../../entities/follow";
import { FollowRepository } from "../../../repositories/FollowRepository";

export class InMemoryFollowRepository implements FollowRepository {
  map: Map<String, Follow>;

  constructor(map: Map<String, Follow>) {
    this.map = map;
  }

  async save(follow: Follow): Promise<void> {
    this.map.set(follow.props.idFollow, follow);
    return;
  }

  async getById(id: string): Promise<Follow> {
    const follow = this.map.get(id);
    if (!follow) {
      throw new Error("The follow was not found");
    }
    return follow;
  }

  async getFollowedIds(userId: string): Promise<string[]> {
    const values = Array.from(this.map.values()); 
    const impactedFollows = values.filter((elem) => elem.props.followedBy === userId);
    if (impactedFollows.length === 0) {
      return [];
    }
    const followedIds = impactedFollows.map((elem) => elem.props.userId);
    return followedIds;
  }
}
