import { Space } from "../../entities/space";
import { SpaceRepository } from "../../repositories/SpaceRepository";
import { Usecases } from "../Usecase";

type UpdateSpaceInput = {
  spaceId: string;
  speaker: string[];
  listener: string[];
};

export class UpdateSpace implements Usecases<UpdateSpaceInput, Promise<Space>> {
  constructor(private readonly _space: SpaceRepository) {}

  async execute(input: UpdateSpaceInput): Promise<Space> {
    const {
      spaceId,
      speaker,
      listener
    } = input
    
    const space = await this._space.getById(spaceId);

    const updateSpace = space.update(speaker, listener);

    this._space.save(updateSpace);

    return updateSpace;
  }
}
