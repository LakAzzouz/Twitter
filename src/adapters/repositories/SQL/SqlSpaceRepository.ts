import { Knex } from "knex";
import { Space } from "../../../core/entities/space";
import { SpaceRepository } from "../../../core/repositories/SpaceRepository";
import { SqlSpaceMapper } from "../mappers/SqlSpaceMapper";
import { SpaceModel } from "../models/SpaceModel";

export class SqlSpaceRepository implements SpaceRepository {
  constructor(
    private readonly knex: Knex,
    private readonly SpaceMapper: SqlSpaceMapper
  ) {}

  async save(spacePost: Space): Promise<void> {
    const spaceModel = this.SpaceMapper.fromDomain(spacePost);
    await this.knex.raw(
      `INSERT INTO space (space_id, speaker, listener, created_at, updated_at)
      VALUES (:space_id, :speaker, :listener, :created_at, :updated_at)`,
      {
        space_id: spaceModel.space_id,
        speaker: spaceModel.speaker,
        listener: spaceModel.listener,
        created_at: spaceModel.created_at,
        updated_at: spaceModel.updated_at ? spaceModel.updated_at : null,
      }
    );
  }

  async getById(spaceId: string): Promise<Space> {
    const spaceModel = await this.knex.raw<SpaceModel[][]>(
      `SELECT * FROM space WHERE space_id = :space_id`,
      {
        space_id: spaceId,
      }
    );
    const space = this.SpaceMapper.toDomain(spaceModel[0][0]);
    return space;
  }
}
