import { Follow } from "../../entities/follow";
import { FollowRepository } from "../../repositories/FollowRepository";
import { TwitterAccountRepository } from "../../repositories/TwitterAccountRepository";
import { Usecases } from "../Usecase";

type FollowAccountInput = {
  id: string;
  followedBy: string;
  userId: string;
};

export class FollowAccount implements Usecases<FollowAccountInput, Promise<Follow>> {
  constructor(
    private readonly _twitterFollowRepository: FollowRepository
) {}

  async execute(input: FollowAccountInput): Promise<Follow> {
    const follow = Follow.create({
      followedBy: input.followedBy,
      userId: input.userId,
    });

    this._twitterFollowRepository.save(follow);

    return follow;
  }
}
