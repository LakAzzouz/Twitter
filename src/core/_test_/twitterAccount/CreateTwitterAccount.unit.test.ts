import { InMemoryTwitterAccountRepository } from "../../../adapters/repositories/InMemoryTwitterAccountRepository";
import { TwitterAccount } from "../../entities/twitterAccount";
import { PasswordGateway } from "../../gateways/PasswordGateway";
import { TwitterAccountRepository } from "../../repositories/TwitterAccountRepository";
import { CreateTwitterAccount } from "../../usecases/Account/CreateTwitterAccount";
import { BCryptGateway } from "../adapters/gateway/BcryptGateway";

describe("Unit - Create Twitter Account", () => {
  let twitterAccountRepository: TwitterAccountRepository;
  let passwordGateway: PasswordGateway;
  let createTwitterAccount: CreateTwitterAccount;
  const twitterAccountDb = new Map<string, TwitterAccount>();
  let twitterAccount: TwitterAccount;
  const username = "user";
  const email = "lakhdar.azzouz@outlook.fr";
  const password = "azerty";

  beforeAll(async () => {
    twitterAccountRepository = new InMemoryTwitterAccountRepository(twitterAccountDb);
    passwordGateway = new BCryptGateway();
    createTwitterAccount = new CreateTwitterAccount(passwordGateway, twitterAccountRepository);
  });

  afterEach(async () => {
    twitterAccountDb.clear();
  });
  it("Should throw an error because the mail already exist", async () => {
    twitterAccount = TwitterAccount.create({
      username: username,
      email: email,
      password: password,
    });
    twitterAccountRepository.save(twitterAccount);

    const result = createTwitterAccount.execute({
      username: username,
      email: email,
      password: password,
    });

    await expect(result).rejects.toThrow("The email already exist");
  });

  it("Should throw an error because the password was too short", async () => {
    const result = createTwitterAccount.execute({
      username: username,
      email: email,
      password: "azer",
    });

    await expect(result).rejects.toThrow("The password was too short");
  });

  it("Should throw an error because the password was too long", async () => {
    const result = createTwitterAccount.execute({
      username: username,
      email: email,
      password: "azerertyuiopqsdfghgfjs",
    });

    await expect(result).rejects.toThrow("The password was too long");
  });

  it("Should return a twitterAccount", async () => {
    const result = await createTwitterAccount.execute({
      username: username,
      email: email,
      password: password,
    });

    const isSamePassword = passwordGateway.compare(
      password,
      result.props.password
    );

    expect(result.props.id).toBeDefined();
    expect(result.props.username).toEqual(username);
    expect(result.props.email).toEqual(email);
    expect(isSamePassword).toBeTruthy();
  });
});
