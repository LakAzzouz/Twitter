import { v4 } from "uuid";
import { Space } from "../../entities/space";
import { SpaceRepository } from "../../repositories/SpaceRepository";
import { SpacePatch } from "../../usecases/Space/UpdateSpace";
import { InMemorySpaceRepository } from "../adapters/repositories/InMemorySpace";

describe("Unit - Update Space", () => {
  let spaceRepository: SpaceRepository;
  let spacePatch: SpacePatch;
  const spaceDb = new Map<string, Space>();
  let space: Space;
  const speaker = "speaker";
  const listener = "listener";
  const addSpeaker = "new_speaker";
  const addListener = "new_listener";

  beforeAll(async () => {
    spaceRepository = new InMemorySpaceRepository(spaceDb);
    spacePatch = new SpacePatch(spaceRepository);
    space = Space.create({
      speaker: [speaker],
      listener: [listener],
    });
    spaceRepository.save(space);
  });

  it("Should update space ", async () => {
    const update = await spacePatch.execute({
      spaceId: space.props.spaceId,
      speaker: [addSpeaker],
      listener: [addListener],
    });

    expect(update.props.spaceId).toBeDefined();
    expect(update.props.createAt).toBeDefined();
    expect(update.props.speaker).toEqual([speaker, addSpeaker]);
    expect(update.props.listener).toEqual([listener, addListener]);
  });
});
