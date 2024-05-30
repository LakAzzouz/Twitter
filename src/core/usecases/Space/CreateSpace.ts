import { Space } from "../../entities/space";
import { SpaceRepository } from "../../repositories/SpaceRepository";
import { Usecases } from "../Usecase";

type CreationOfSpaceInput = {
  speaker: string[];
  listener: string[];
};

export class CreationOfSpace implements Usecases<CreationOfSpaceInput, Promise<Space>>{
  constructor(private readonly _space: SpaceRepository) {}

  async execute(input: CreationOfSpaceInput): Promise<Space> {
    const space = Space.create({
      speaker: input.speaker,
      listener: input.listener,
    });

    this._space.save(space);

    return space;
  }
}
