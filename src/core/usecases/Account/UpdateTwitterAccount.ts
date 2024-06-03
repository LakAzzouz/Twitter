import { TwitterAccount } from "../../entities/twitterAccount";
import { TwitterAccountRepository } from "../../repositories/TwitterAccountRepository";
import { Usecases } from "../Usecase";

type UpdateTwitterAccountInput = {
  id: string;
  username: string;
};

export class UpdateTwitterAccount implements Usecases<UpdateTwitterAccountInput, Promise<TwitterAccount>>{
  constructor(
    private readonly _twitterAccountRepository: TwitterAccountRepository
  ) {}

  async execute(input: UpdateTwitterAccountInput): Promise<TwitterAccount> {
    const account = await this._twitterAccountRepository.getById(input.id);

    const update = account.update(input.username);

    this._twitterAccountRepository.save(account);

    return update;
  }
}
