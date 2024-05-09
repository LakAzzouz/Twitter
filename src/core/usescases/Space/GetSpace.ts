import { Space } from "../../entities/space"
import { SpaceRepository } from "../../repositories/SpaceRepository"
import { Usecases } from "../Usecase"

type GetSpaceInput = {
    spaceId: string
}

export class GetSpace implements Usecases<GetSpaceInput, Promise<Space>>{
    constructor(
        private readonly _space: SpaceRepository
    ){}

    async execute(input: GetSpaceInput): Promise<Space> {

        const space = await this._space.getById(input.spaceId)
        
        return space
    }
}