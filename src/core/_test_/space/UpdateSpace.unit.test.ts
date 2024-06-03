import { Space } from "../../entities/space";
import { SpaceRepository } from "../../repositories/SpaceRepository";
import { UpdateSpace } from "../../usecases/Space/SpaceUpdate";
import { InMemorySpaceRepository } from "../adapters/repositories/InMemorySpace";

describe("Unit - Update Space", () => {
  let spaceRepository: SpaceRepository;
  let spacePatch: UpdateSpace;
  const spaceDb = new Map<string, Space>();
  let space: Space;
  const speaker = "speaker";
  const listener = "listener";
  const addSpeaker = "new_speaker";
  const addListener = "new_listener";

  beforeAll(async () => {
    spaceRepository = new InMemorySpaceRepository(spaceDb);
    spacePatch = new UpdateSpace(spaceRepository);
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
    expect(update.props.createdAt).toBeDefined();
    expect(update.props.speaker).toEqual([speaker, addSpeaker]);
    expect(update.props.listener).toEqual([listener, addListener]);
  });
});
