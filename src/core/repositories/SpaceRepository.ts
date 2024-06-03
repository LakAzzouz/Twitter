import { Space } from "../entities/space";

export interface SpaceRepository {
  save(space: Space): Promise<void>;

  getById(spaceId: string): Promise<Space>;
}
