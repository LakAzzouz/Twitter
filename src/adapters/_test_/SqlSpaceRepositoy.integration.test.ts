import { Space } from "../../core/entities/space";
import { SqlSpaceRepository } from "../repositories/SQL/SqlSpaceRepository";
import { SqlSpaceMapper } from "../repositories/mappers/SqlSpaceMapper";
import { dbTest } from "./tools/dbTest";

describe("Integ - SQL Space Repository", () => {
  let sqlSpaceMapper: SqlSpaceMapper;
  let sqlSpaceRepositoy: SqlSpaceRepository;
  let space: Space;

  beforeAll(async () => {
    sqlSpaceMapper = new SqlSpaceMapper();
    sqlSpaceRepositoy = new SqlSpaceRepository(dbTest, sqlSpaceMapper);
    space = new Space({
      spaceId: "space_id",
      speaker: ["speaker"],
      listener: ["listener"],
      createdAt: new Date(),
      updatedAt: new Date()
    });
  });

  beforeEach(async () => {
    await dbTest.raw(`TRUNCATE TABLE space`);
  });

  it("Should save a space an get it by id", async () => {
    await sqlSpaceRepositoy.save(space);

    const spaceId = space.props.spaceId;

    const result = await sqlSpaceRepositoy.getById(spaceId);

    expect(result.props.spaceId).toEqual(space.props.spaceId);
    expect([result.props.speaker]).toEqual(space.props.speaker);
    expect([result.props.listener]).toEqual(space.props.listener);
    expect(result.props.createdAt).toBeDefined();
  });
});
