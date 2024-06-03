import { InMemorySpaceRepository } from "../../../adapters/repositories/inMemory/InMemorySpace";
import { Space } from "../../entities/space";
import { SpaceRepository } from "../../repositories/SpaceRepository";
import { GetSpace } from "../../usecases/Space/GetSpace";

describe("Unit - GetSpace", () => {
  let getSpace: GetSpace;
  let spaceRepository: SpaceRepository;
  const spaceDb = new Map<string, Space>();

  beforeAll(async () => {
    spaceRepository = new InMemorySpaceRepository(spaceDb);
    getSpace = new GetSpace(spaceRepository);
  });

  it("Should get space by id", async () => {
    const space = new Space({
      spaceId: "space_id",
      speaker: ["toto"],
      listener: ["tata"],
      createdAt: new Date(),
    });
    spaceDb.set(space.props.spaceId, space);

    const result = await getSpace.execute({
      spaceId: "space_id",
    });
    expect(result.props.spaceId).toEqual("space_id");
    expect(result.props.speaker).toEqual(["toto"]);
    expect(result.props.listener).toEqual(["tata"]);
    expect(result.props.createdAt).toBeDefined();
  });
});
