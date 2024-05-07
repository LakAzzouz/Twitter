import { TwitterPost } from "../../entities/twitterPost"
import { TwitterPostRepository } from "../../repositories/TwitterPostRepository"
import { Usecases } from "../Usecase"

type TwitterGetInput = {
    idPost: string
}

export class TwitterGet implements Usecases<TwitterGetInput, Promise<TwitterPost>>{
    constructor(
        private readonly _twitterPostRepository: TwitterPostRepository
    ){}

    async execute(input: TwitterGetInput): Promise<TwitterPost> {
        
        const twitterPost = await this._twitterPostRepository.getById(input.idPost)

        return twitterPost
    }
}