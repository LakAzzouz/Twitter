"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.spaceMap = exports.followMap = exports.twitterPostMap = exports.twitterAccountMap = exports.postRouter = exports.spaceRouteur = exports.followRouter = exports.accountRouter = void 0;
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const jwt = require('jsonwebtoken');
const CreateTwitterAccount_1 = require("../../core/usescases/Account/CreateTwitterAccount");
const BcryptGateway_1 = require("../../adapters/gateway/BcryptGateway");
const SignInTwitterAccount_1 = require("../../core/usescases/Account/SignInTwitterAccount");
const TwitterPost_1 = require("../../core/usescases/Post/TwitterPost");
const InMemoryTwitterPostRepository_1 = require("../../adapters/repositories/InMemoryTwitterPostRepository");
const TwitterGet_1 = require("../../core/usescases/Post/TwitterGet");
const FollowAccount_1 = require("../../core/usescases/Follow/FollowAccount");
const InMemoryFollow_1 = require("../../adapters/repositories/InMemoryFollow");
const InMemoryTwitterAccountRepository_1 = require("../../adapters/repositories/InMemoryTwitterAccountRepository");
const GetFollow_1 = require("../../core/usescases/Follow/GetFollow");
const GetFeed_1 = require("../../core/usescases/Follow/GetFeed");
const TwitterGetByTag_1 = require("../../core/usescases/Post/TwitterGetByTag");
const InMemorySpace_1 = require("../../adapters/repositories/InMemorySpace");
const SpacePost_1 = require("../../core/usescases/Space/SpacePost");
const GetSpace_1 = require("../../core/usescases/Space/GetSpace");
const SpacePatch_1 = require("../../core/usescases/Space/SpacePatch");
const auth_1 = require("../middlewares/auth");
exports.accountRouter = express_1.default.Router();
exports.followRouter = express_1.default.Router();
exports.spaceRouteur = express_1.default.Router();
exports.postRouter = express_1.default.Router();
exports.twitterAccountMap = new Map();
exports.twitterPostMap = new Map();
exports.followMap = new Map();
exports.spaceMap = new Map();
const jwtSecret = process.env.JWT_SECRET;
const twitterRepository = new InMemoryTwitterAccountRepository_1.InMemoryTwitterAccountRepository(exports.twitterAccountMap);
const twitterPostRepository = new InMemoryTwitterPostRepository_1.InMemoryTwitterPostRepository(exports.twitterPostMap);
const followRepository = new InMemoryFollow_1.InMemoryFollowRepository(exports.followMap);
const spaceRepository = new InMemorySpace_1.InMemorySpaceRepository(exports.spaceMap);
const bcrypt = new BcryptGateway_1.BCryptGateway();
const createTwitterAccount = new CreateTwitterAccount_1.CreateTwitterAccount(bcrypt, twitterRepository);
const signInTwitterAccount = new SignInTwitterAccount_1.SignInTwitterAccount(bcrypt, twitterRepository);
const twitterAccountPost = new TwitterPost_1.TwitterAccountPost(twitterPostRepository);
const twitterGet = new TwitterGet_1.TwitterGet(twitterPostRepository);
const follower = new FollowAccount_1.FollowAccount(followRepository, twitterRepository);
const getFollow = new GetFollow_1.GetFollow(followRepository);
const getFeed = new GetFeed_1.GetFeed(followRepository, twitterPostRepository);
const getTag = new TwitterGetByTag_1.TwitterGetTag(twitterPostRepository);
const spacePost = new SpacePost_1.SpacePost(spaceRepository);
const getSpace = new GetSpace_1.GetSpace(spaceRepository);
const spacePatch = new SpacePatch_1.SpacePatch(spaceRepository);
exports.accountRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const { username, email, password } = body;
        const twitterAccount = yield createTwitterAccount.execute({
            username: username,
            email: email,
            password: password
        });
        const result = {
            id: twitterAccount.props.id,
            username: twitterAccount.props.username,
            email: twitterAccount.props.email,
            createdAt: twitterAccount.props.createdAt // à formater
        };
        res.status(201).send(result);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
    }
}));
exports.accountRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const { email, password } = body;
        const twitterAccount = yield signInTwitterAccount.execute({
            email: email,
            password: password
        });
        const token = jwt.sign({ username: twitterAccount.props.username, email: twitterAccount.props.email }, jwtSecret);
        const result = `Welcome to Twitter ${twitterAccount.props.username}`;
        res.status(201).send({ result, token });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
    }
}));
exports.postRouter.use(auth_1.Auth);
exports.postRouter.post("/post", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authRequest = req;
        const userId = authRequest.user.id;
        const body = req.body;
        const { username, text, tag } = body;
        const post = yield twitterAccountPost.execute({
            userId: userId,
            username: username,
            post: text,
            tag: tag,
        });
        const result = {
            userId: post.props.userId,
            idPost: post.props.idPost,
            username: post.props.username,
            post: post.props.post,
            tag: post.props.tag,
            createdAt: post.props.createdAt,
        };
        res.status(201).send(result);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
    }
}));
exports.postRouter.get("/getPost/:idPost", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idPost = req.params.idPost;
        const post = yield twitterGet.execute({
            idPost: idPost
        });
        const result = {
            id: post.props.idPost,
            username: post.props.username,
            post: post.props.post,
            tag: post.props.tag
        };
        res.status(200).send(result);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
    }
}));
exports.followRouter.post("/follow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idFollow = (0, uuid_1.v4)();
        const body = req.body;
        const { userId, followedBy } = body;
        const follow = yield follower.execute({
            id: idFollow,
            userId: userId,
            followedBy: followedBy
        });
        const result = {
            idFollow: follow.props.idFollow,
            userId: follow.props.userId,
            followedBy: follow.props.followedBy
        };
        res.status(201).send(result);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
    }
}));
exports.followRouter.get("/follow/:idFollow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idFollow = req.params.idFollow;
        const follow = yield getFollow.execute({
            idFollow: idFollow
        });
        const result = {
            follow: follow
        };
        res.status(200).send(result.follow.props);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
    }
}));
exports.postRouter.get("/feed/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const feed = yield getFeed.execute({
            id: id
        });
        const result = feed.map(elm => elm.props);
        const arr = result.sort((a, b) => +b.createdAt - +a.createdAt);
        res.status(200).send(arr);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
    }
}));
exports.postRouter.get("/tag", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const { tag } = body;
        const posts = yield getTag.execute({
            tag: tag,
        });
        const result = posts.map(elm => elm.props);
        res.status(200).send(result);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
    }
}));
exports.spaceRouteur.post("/space", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const { speaker, listener } = body;
        const space = yield spacePost.execute({
            speaker: speaker,
            listener: listener
        });
        const result = {
            spaceId: space.props.spaceId,
            speaker: space.props.speaker,
            listener: space.props.listener,
            createdAt: space.props.createAt
        };
        res.status(201).send(result);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
    }
}));
exports.spaceRouteur.get("/space/:spaceId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const spaceId = req.params.spaceId;
        const space = yield getSpace.execute({
            spaceId: spaceId
        });
        const result = {
            speaker: space.props.speaker,
            listener: space.props.listener,
            createdAt: space.props.createAt
        };
        res.status(200).send(result);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
    }
}));
exports.spaceRouteur.patch("/space/:spaceId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const spaceId = req.params.spaceId;
        const body = req.body;
        const { speaker, listener } = body;
        const space = yield spacePatch.execute({
            spaceId: spaceId,
            speaker: speaker,
            listener: listener
        });
        const result = {
            spaceId: space.props.spaceId,
            speaker: space.props.speaker,
            listener: space.props.listener
        };
        res.status(201).send(result);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
    }
}));
//# sourceMappingURL=twitter.js.map