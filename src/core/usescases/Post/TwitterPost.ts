import { TwitterPost } from "../../entities/twitterPost";
import { TwitterPostRepository } from "../../repositories/TwitterPostRepository";
import { Twitte } from "../../valueObjects/TwitterPost";
import { Usecases } from "../Usecase";

type TwitterAccountPostInput = {
  userId: string;
  username: string;
  post: string;
  tag: string;
};

export class TwitterAccountPost implements Usecases<TwitterAccountPostInput, Promise<TwitterPost>> {
  constructor(
    private readonly _twitterPostRepository: TwitterPostRepository
) {}

  async execute(input: TwitterAccountPostInput): Promise<TwitterPost> {
    Twitte.characterLimit(input.post);

    const twitterPost = TwitterPost.create({
      userId: input.userId,
      username: input.username,
      post: input.post,
      tag: input.tag,
    });

    this._twitterPostRepository.save(twitterPost);

    return twitterPost;
  }
}
