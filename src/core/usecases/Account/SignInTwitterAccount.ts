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
    console.log("======> 1")
    const twitterAccount = await this._twitterAccountRepository.getByEmail(
      input.email
    );
    console.log("======> 2")

    if (!twitterAccount) {
      throw new Error("This mail doesn't exist");
    }
    console.log("======> 3")

    const isMatching = this._passwordGateway.compare(input.password, twitterAccount.props.password);

    if (!isMatching) {
      throw new Error("The password is incorrect !");
    }
    return twitterAccount;
  }
}
