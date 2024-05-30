import { Space } from "../../../core/entities/space";
import { SpaceRepository } from "../../../core/repositories/SpaceRepository";

export class InMemorySpaceRepository implements SpaceRepository {
  map: Map<String, Space>;

  constructor(map: Map<String, Space>) {
    this.map = map;
  }

  async save(spacePost: Space): Promise<Space> {
    this.map.set(spacePost.props.spaceId, spacePost);
    return spacePost;
  }

  async getById(spaceId: string): Promise<Space> {
    const space = this.map.get(spaceId);
    if (!space) {
      throw new Error("Space not found");
    }
    return space;
  }
}
