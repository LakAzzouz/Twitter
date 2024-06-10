import { Space } from "../../entities/space";
import { SpaceRepository } from "../../repositories/SpaceRepository";
import { CreationOfSpace } from "../../usecases/Space/CreateSpace";
import { InMemorySpaceRepository } from "../adapters/repositories/InMemorySpaceRepository";

describe('Unit - SpacePost', () => {
    let spacePost: CreationOfSpace
    let spaceRepository: SpaceRepository;
    const spaceDb = new Map<string, Space>();

    beforeAll(async () => {
        spaceRepository = new InMemorySpaceRepository(spaceDb)
        spacePost = new CreationOfSpace(spaceRepository)
    })

    it("Should return space", async () => {
        const space = await spacePost.execute({
            speaker: ["toto"],
            listener: ["tata"]
        })
        expect(space.props.spaceId).toBeDefined()
        expect(space.props.createdAt).toBeDefined()
        expect(space.props.speaker).toEqual(["toto"])
        expect(space.props.listener).toEqual(["tata"])
    })

    

    //it("Should throw an error because of space not found", async () => {

    //})
})
