import { Space } from "../entities/space";

export interface SpaceRepository {

    save(space: Space): Promise<Space>

    getById(spaceId: string): Promise<Space>
}