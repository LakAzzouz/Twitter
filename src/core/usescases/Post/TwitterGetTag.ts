import { TwitterPost } from "../../entities/twitterPost"
import { TwitterPostRepository } from "../../repositories/TwitterPostRepository"
import { Usecases } from "../Usecase"

type TwitterGetTagInput = {
    id: string
    tag: string
}

/*export class TwitterGetTag implements Usecases<TwitterGetTagInput, Promise<TwitterPost>>{
    constructor(
        private readonly _twitterPostRepository: TwitterPostRepository
    ){}
    
    async execute(input: TwitterGetTagInput): Promise<TwitterPost> {

        //const getTag = await this._twitterPostRepository.getTag(input.tag)

        return getTag
        
    }
}*/