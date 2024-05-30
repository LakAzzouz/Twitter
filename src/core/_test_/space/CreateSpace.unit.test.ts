import { Space } from "../../entities/space";
import { SpaceRepository } from "../../repositories/SpaceRepository";
import { CreationOfSpace } from "../../usecases/Space/CreateSpace";
import { InMemorySpaceRepository } from "../adapters/repositories/InMemorySpace";

describe("Unit - Creation Of Space", () => {
  let spacePost: CreationOfSpace;
  let spaceRepository: SpaceRepository;
  const spaceDb = new Map<string, Space>();
  const speaker = "speaker";
  const listener = "listener";

  beforeAll(async () => {
    spaceRepository = new InMemorySpaceRepository(spaceDb);
    spacePost = new CreationOfSpace(spaceRepository);
  });

  it("Should return a space", async () => {
    const space = await spacePost.execute({
      speaker: [speaker],
      listener: [listener],
    });
    expect(space.props.spaceId).toBeDefined();
    expect(space.props.createAt).toBeDefined();
    expect(space.props.speaker).toEqual([speaker]);
    expect(space.props.listener).toEqual([listener]);
  });

  //it("Should throw an error because of space not found", async () => {

  //})
});
