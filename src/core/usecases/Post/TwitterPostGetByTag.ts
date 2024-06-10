import { TwitterPost } from "../../entities/twitterPost";
import { TwitterPostRepository } from "../../repositories/TwitterPostRepository";
import { Usecases } from "../Usecase";

type TwitterPostGetByTagInput = {
  tag: string;
};

export class TwitterPostGetByTag implements Usecases<TwitterPostGetByTagInput, Promise<TwitterPost[]>>{
  constructor(private readonly _twitterPostRepository: TwitterPostRepository) {}

  async execute(input: TwitterPostGetByTagInput): Promise<TwitterPost[]> {
    const getByTag = await this._twitterPostRepository.selectPostByTag(input.tag);

    return getByTag;
  }
}
