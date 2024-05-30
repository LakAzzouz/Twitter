import { Follow } from "../../entities/follow";
import { FollowRepository } from "../../repositories/FollowRepository";
import { Usecases } from "../Usecase";

type FollowAccountInput = {
  userId: string;
  followedBy: string;
};

export class FollowAccount implements Usecases<FollowAccountInput, Promise<Follow>>{
  constructor(private readonly _twitterFollowRepository: FollowRepository) {}

  async execute(input: FollowAccountInput): Promise<Follow> {
    const follow = Follow.create({
      followedBy: input.followedBy,
      userId: input.userId,
    });

    this._twitterFollowRepository.save(follow);

    return follow;
  }
}
