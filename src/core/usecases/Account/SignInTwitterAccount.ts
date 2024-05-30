import { TwitterAccount } from "../../entities/twitterAccount";
import { PasswordGateway } from "../../gateways/PasswordGateway";
import { TwitterAccountRepository } from "../../repositories/TwitterAccountRepository";
import { Usecases } from "../Usecase";

type SignInTwitterAccountInput = {
  email: string;
  password: string;
};

export class SignInTwitterAccount implements Usecases<SignInTwitterAccountInput, Promise<TwitterAccount>>{
  constructor(
    private readonly _passwordGateway: PasswordGateway,
    private readonly _twitterAccountRepository: TwitterAccountRepository
  ) {}

  async execute(input: SignInTwitterAccountInput): Promise<TwitterAccount> {
    const twitterAccount = await this._twitterAccountRepository.getByEmail(
      input.email
    );
    if (!twitterAccount) {
      throw new Error("This mail doesn't exist");
    }

    const isMatching = this._passwordGateway.compare(input.password, twitterAccount.props.password);
    if (!isMatching) {
      throw new Error("The password is incorrect !");
    }
    return twitterAccount;
  }
}
