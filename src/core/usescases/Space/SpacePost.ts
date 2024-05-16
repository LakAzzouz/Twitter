import { Space } from "../../entities/space";
import { SpaceRepository } from "../../repositories/SpaceRepository";
import { Usecases } from "../Usecase";

type SpacePostInput = {
  speaker: string[];
  listener: string[];
};

export class SpacePost implements Usecases<SpacePostInput, Promise<Space>> {
  constructor(
    private readonly _space: SpaceRepository
) {}

  async execute(input: SpacePostInput): Promise<Space> {
    const space = Space.create({
      speaker: input.speaker,
      listener: input.listener,
    });

    this._space.save(space);

    return space;
  }
}
