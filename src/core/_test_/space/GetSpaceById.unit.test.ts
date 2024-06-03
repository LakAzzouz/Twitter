import { InMemorySpaceRepository } from "../../../adapters/repositories/inMemory/InMemorySpace";
import { Space } from "../../entities/space";
import { SpaceRepository } from "../../repositories/SpaceRepository";
import { GetSpace } from "../../usecases/Space/GetSpace";

describe("Unit - Get Space By Id", () => {
  let getSpace: GetSpace;
  let spaceRepository: SpaceRepository;
  const spaceDb = new Map<string, Space>();
  const spaceId = "space_id";
  const speaker = "speaker";
  const listener = "listener";
  const date = new Date();

  beforeAll(async () => {
    spaceRepository = new InMemorySpaceRepository(spaceDb);
    getSpace = new GetSpace(spaceRepository);
  });

  it("Should get space by id", async () => {
    const space = new Space({
      spaceId: spaceId,
      speaker: [speaker],
      listener: [listener],
      createdAt: date,
    });
    spaceDb.set(space.props.spaceId, space);

    const result = await getSpace.execute({
      spaceId: spaceId,
    });
    expect(result.props.spaceId).toEqual(spaceId);
    expect(result.props.speaker).toEqual([speaker]);
    expect(result.props.listener).toEqual([listener]);
    expect(result.props.createdAt).toBeDefined();
  });
})