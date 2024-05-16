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

    account.update(input.username);

    const accountUpdated = this._twitterAccountRepository.save(account);

    return accountUpdated;
  }
}
