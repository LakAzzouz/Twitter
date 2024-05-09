import { TwitterPost } from "../../entities/twitterPost"
import { TwitterPostRepository } from "../../repositories/TwitterPostRepository"
import { Usecases } from "../Usecase"

type TwitterGetTagInput = {
    tag: string
}

export class TwitterGetTag implements Usecases<TwitterGetTagInput, Promise<TwitterPost[]>>{
    constructor(
        private readonly _twitterPostRepository: TwitterPostRepository
    ){}
    
    async execute(input: TwitterGetTagInput): Promise<TwitterPost[]> {

        const getByTag = this._twitterPostRepository.selectPostByTag(input.tag)

        return getByTag
    }
}