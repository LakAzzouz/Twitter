import { TwitterAccount } from "../../entities/twitterAccount";
import { PasswordGateway } from "../../gateways/PasswordGateway";
import { TwitterAccountRepository } from "../../repositories/TwitterAccountRepository";
import { SignInTwitterAccount } from "../../usecases/Account/SignInTwitterAccount";
import { BCryptGateway } from "../adapters/gateway/BcryptGateway";
import { InMemoryTwitterAccountRepository } from "../adapters/repositories/InMemoryTwitterAccountRepository";

describe("Unit - SignIn Twitter Account", () => {
  let twitterAccountRepository: TwitterAccountRepository;
  let passwordGateway: PasswordGateway;
  let signInTwitterAccount: SignInTwitterAccount;
  const twitterAccountDb = new Map<String, TwitterAccount>();
  let twitterAccount: TwitterAccount;
  const username = "user";
  const email = "lakhdar.azzouz@outlook.fr";
  const password = "azerty";

  beforeAll(async () => {
    twitterAccountRepository = new InMemoryTwitterAccountRepository(twitterAccountDb);
    passwordGateway = new BCryptGateway();
    signInTwitterAccount = new SignInTwitterAccount(
      passwordGateway,
      twitterAccountRepository
    );
  });

  afterEach(async () => {
    twitterAccountDb.clear();
  });

  it("Should return a twitter account", async () => {
    const salt = 10;
    const passwordEncrypted = passwordGateway.hashPassword("azerty", salt);
    twitterAccount = TwitterAccount.create({
      username: username,
      email: email,
      password: passwordEncrypted,
    });
    twitterAccountRepository.save(twitterAccount);

    const result = await signInTwitterAccount.execute({
      email: email,
      password: password,
    });
    expect(result.props.id).toBeDefined();
    expect(result.props.username).toEqual(username);
    expect(result.props.email).toEqual(email);
    expect(result.props.password).toEqual(passwordEncrypted);
  });

  it("Should throw an error because the mail doesn't exist", async () => {
    twitterAccount = TwitterAccount.create({
      username: username,
      email: email,
      password: password,
    });
    twitterAccountRepository.save(twitterAccount);

    const result = signInTwitterAccount.execute({
      email: "johnDoe.gmail.com",
      password: password,
    });

    await expect(result).rejects.toThrow("This mail doesn't exist");
  });

  it("Should throw an error because the password was inccorect", async () => {
    twitterAccount = TwitterAccount.create({
      username: username,
      email: email,
      password: password,
    });
    twitterAccountRepository.save(twitterAccount);

    const result = signInTwitterAccount.execute({
      email: email,
      password: "123456",
    });

    await expect(result).rejects.toThrow("The password is incorrect !");
  });
});
