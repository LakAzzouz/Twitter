import { Space } from "../../../entities/space";
import { SpaceRepository } from "../../../repositories/SpaceRepository";

export class InMemorySpaceRepository implements SpaceRepository {
  map: Map<String, Space>;

  constructor(map: Map<String, Space>) {
    this.map = map;
  }

  async save(spacePost: Space): Promise<void> {
    this.map.set(spacePost.props.spaceId, spacePost);
  }

  async getById(spaceId: string): Promise<Space> {
    const space = this.map.get(spaceId);
    if (!space) {
      throw new Error("Space not found");
    }
    return space;
  }
}
