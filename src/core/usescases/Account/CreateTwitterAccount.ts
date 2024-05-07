import { TwitterAccount } from "../../entities/twitterAccount"
import { PasswordGateway } from "../../gateways/PasswordGateway"
import { TwitterAccountRepository } from "../../repositories/TwitterAccountRepository"
import { Password } from "../../valueObjects/Password"
import { Usecases } from "../Usecase"

type CreateTwitterAccountInput = {
    username: string,
    email: string,
    password: string
}

export class CreateTwitterAccount implements Usecases<CreateTwitterAccountInput, Promise<TwitterAccount>> {
    constructor(
        private readonly _passwordGateway: PasswordGateway,
        private readonly _twitterAccountRepository: TwitterAccountRepository
    ){}

    async execute(input: CreateTwitterAccountInput): Promise<TwitterAccount> {
        
        const twitterAccountAllReadyExist = await this._twitterAccountRepository.getByEmail(input.email)
        if(twitterAccountAllReadyExist){
            throw new Error("The mail exist")
        }

        const passwordValidated = Password.passwordLength(input.password)
        
        const hashedPassword = this._passwordGateway.hashPassword(passwordValidated, 10)
        
        const twitterAccount = TwitterAccount.create({
            username: input.username,
            email: input.email,
            password: hashedPassword,
        });

        this._twitterAccountRepository.save(twitterAccount);

        return twitterAccount
    }
}