import { TwitterPost } from "../../entities/twitterPost";
import { FollowRepository } from "../../repositories/FollowRepository";
import { TwitterPostRepository } from "../../repositories/TwitterPostRepository";
import { Usecases } from "../Usecase";

type GetFeedInput = {
  id: string;
};

export class GetFeed implements Usecases<GetFeedInput, Promise<TwitterPost[]>> {
  constructor(
    private readonly _twitterFollowRepository: FollowRepository,
    private readonly _twitterPostRepository: TwitterPostRepository
  ) {}

  async execute(input: GetFeedInput): Promise<TwitterPost[]> {
    const followedIds = await this._twitterFollowRepository.getFollowedIds(input.id);

    const twitterPosts = await this._twitterPostRepository.getByFollowedIds(followedIds);

    return twitterPosts;
  }
}
