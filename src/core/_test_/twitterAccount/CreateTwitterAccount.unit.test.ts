import { InMemoryTwitterAccountRepository } from "../../../adapters/repositories/InMemoryTwitterAccountRepository";
import { TwitterAccount } from "../../entities/twitterAccount";
import { PasswordGateway } from "../../gateways/PasswordGateway";
import { TwitterAccountRepository } from "../../repositories/TwitterAccountRepository";
import { CreateTwitterAccount } from "../../usescases/Account/CreateTwitterAccount";
import { BCryptGateway } from "../adapters/gateway/BcryptGateway";


describe('Unit - Create Twitter Account', () => {
    let twitterAccountRepository: TwitterAccountRepository;
    let passwordGateway: PasswordGateway;
    let createTwitterAccount: CreateTwitterAccount;
    const twitterAccountDb = new Map<string, TwitterAccount>();
    let twitterAccount: TwitterAccount

    beforeAll(async () => {
        twitterAccountRepository = new InMemoryTwitterAccountRepository(twitterAccountDb);
        passwordGateway = new BCryptGateway();
        createTwitterAccount = new CreateTwitterAccount(passwordGateway, twitterAccountRepository);
    })

    afterEach(async () => {
        twitterAccountDb.clear()

    
})
    it("Should throw an error because the mail already exist", async () => {
        twitterAccount = TwitterAccount.create({
            username: "user1",
            email: "lakhdar.azzouz@outlook.fr",
            password: "azerty"
        })
        twitterAccountRepository.save(twitterAccount);

        const result = createTwitterAccount.execute({
            username: "user1",
            email: "lakhdar.azzouz@outlook.fr",
            password: "azerty"
        })

        await expect(result).rejects.toThrow("The mail exist")
    })

    it("Should throw an error because the password was too short", async() => {
        const result = createTwitterAccount.execute({
            username: "user1",
            email: "lakhdar.azzouz@outlook.fr",
            password: "azer"
        })

        await expect(result).rejects.toThrow("The password was too short")
    })


    it("Should throw an error because the password was too long", async() => {
        const result = createTwitterAccount.execute({
            username: "user1",
            email: "lakhdar.azzouz@outlook.fr",
            password: "azerertyuiopqsdfghgfjs"
        })

        await expect(result).rejects.toThrow("The password was too long")
    })


    it("Should return a twitterAccount", async () => {
        const result = await createTwitterAccount.execute({
            username: "user1",
            email: "lakhdar.azzouz@outlook.fr",
            password: "azerty"
        })

        const isSamePassword = passwordGateway.compare("azerty", result.props.password)

        expect(result.props.id).toBeDefined() //OK
        expect(result.props.username).toEqual("user1") //OK
        expect(result.props.email).toEqual("lakhdar.azzouz@outlook.fr") //OK
        expect(isSamePassword).toBeTruthy() //OK
    })
})