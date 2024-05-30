import { InMemoryTwitterAccountRepository } from "../../../adapters/repositories/InMemoryTwitterAccountRepository";
import { TwitterAccount } from "../../entities/twitterAccount";
import { TwitterAccountRepository } from "../../repositories/TwitterAccountRepository";
import { UpdateTwitterAccount } from "../../usecases/Account/UpdateTwitterAccount";

describe("Unit - Update Twitter Account", () => {
  let twitterAccountRepository: TwitterAccountRepository;
  let updateTwitterAccount: UpdateTwitterAccount;
  const twitterAccountDb = new Map<string, TwitterAccount>();
  let twitterAccount: TwitterAccount;
  const username = "user";
  const email = "lakhdar.azzouz@outlook.fr";
  const password = "azerty";

  beforeAll(async () => {
    twitterAccountRepository = new InMemoryTwitterAccountRepository(
      twitterAccountDb
    );
    updateTwitterAccount = new UpdateTwitterAccount(twitterAccountRepository);
    twitterAccount = TwitterAccount.create({
      username: username,
      email: email,
      password: password,
    });
    twitterAccountRepository.save(twitterAccount);
  });

  afterEach(async () => {
    twitterAccountDb.clear();
  });

  it("Should update twitter account with a new username", async () => {
    const newUsername = "Lakhdar";
    const update = await updateTwitterAccount.execute({
      id: twitterAccount.props.id,
      username: newUsername,
    });

    expect(update.props.id).toBeDefined();
    expect(update.props.username).toEqual(newUsername);
  });

  it("Should throw because user is not found", async () => {
    const result = updateTwitterAccount.execute({
      id: "wrong_id",
      username: username,
    });

    await expect(result).rejects.toThrow("Twitter account not found !");
  });
});
