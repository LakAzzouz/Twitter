import { Follow } from "../../entities/follow";
import { FollowRepository } from "../../repositories/FollowRepository";
import { Usecases } from "../Usecase";

type GetFollowInput = {
  idFollow: string;
};

export class GetFollow implements Usecases<GetFollowInput, Promise<Follow>> {
  constructor(private readonly _twitterFollowRepository: FollowRepository) {}

  async execute(input: GetFollowInput): Promise<Follow> {
    const follow = this._twitterFollowRepository.getById(input.idFollow);

    return follow;
  }
}
