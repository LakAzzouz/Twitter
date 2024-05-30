import { TwitterPost } from "../../entities/twitterPost";
import { TwitterPostRepository } from "../../repositories/TwitterPostRepository";
import { Twitte } from "../../valueObjects/Twitte";
import { Usecases } from "../Usecase";

type CreateTwitterPostInput = {
  userId: string;
  username: string;
  post: string;
  tag: string;
};

export class CreateTwitterPost implements Usecases<CreateTwitterPostInput, Promise<TwitterPost>>{
  constructor(private readonly _twitterPostRepository: TwitterPostRepository) {}

  async execute(input: CreateTwitterPostInput): Promise<TwitterPost> {
    const { userId, username, post, tag } = input;

    Twitte.characterLimit(post);

    const twitterPost = TwitterPost.create({
      userId,
      username,
      post,
      tag,
    });

    this._twitterPostRepository.save(twitterPost);

    return twitterPost;
  }
}
