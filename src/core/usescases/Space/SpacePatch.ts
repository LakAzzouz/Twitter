import { Space } from "../../entities/space"
import { SpaceRepository } from "../../repositories/SpaceRepository"
import { Usecases } from "../Usecase"

type SpacePatchInput = {
    spaceId: string
    speaker: string[]
    listener: string[]
}

export class SpacePatch implements Usecases<SpacePatchInput, Promise<Space>>{
    constructor(
        private readonly _space: SpaceRepository
    ){}

    async execute(input: SpacePatchInput): Promise<Space> {

        const space = await this._space.getById(input.spaceId)

        const updateSpace = space.update(input.speaker, input.listener)

        const newSpace = this._space.save(updateSpace)

        return newSpace
    }
}