require("dotenv").config();
import { v4 } from "uuid";
const jwt = require("jsonwebtoken");

import express, { Request, Response } from "express";
import { InMemoryTwitterPostRepository } from "../../adapters/repositories/InMemoryTwitterPostRepository";
import { InMemoryFollowRepository } from "../../adapters/repositories/InMemoryFollow";
import { Follow } from "../../core/entities/follow";
import { TwitterPost } from "../../core/entities/twitterPost";
import { InMemoryTwitterAccountRepository } from "../../adapters/repositories/InMemoryTwitterAccountRepository";
import { TwitterAccount } from "../../core/entities/twitterAccount";
import { Auth, RequestAuth } from "../middlewares/auth";
import { FollowAccount } from "../../core/usescases/Follow/FollowAccount";
import { GetFollow } from "../../core/usescases/Follow/GetFollow";
import { GetFeed } from "../../core/usescases/Follow/GetFeed";

export const followRouter = express.Router();

export const twitterPostMap = new Map<String, TwitterPost>();
export const followMap = new Map<String, Follow>();
export const twitterAccountMap = new Map<String, TwitterAccount>();

const twitterPostRepository = new InMemoryTwitterPostRepository(twitterPostMap);
const followRepository = new InMemoryFollowRepository(followMap);
const twitterRepository = new InMemoryTwitterAccountRepository(twitterAccountMap);

const follower = new FollowAccount(followRepository);
const getFollow = new GetFollow(followRepository);
const getFeed = new GetFeed(followRepository, twitterPostRepository);
const jwtSecret = process.env.JWT_SECRET;

followRouter.use(Auth);
followRouter.post("/follow", async (req: Request, res: Response) => {
  try {
    const reqAuth = req as RequestAuth;
    const idFollow = v4();
    const body = req.body;
    const { followedBy } = body;
    const userId = reqAuth.user.id;

    const follow = await follower.execute({
      id: idFollow,
      userId: userId,
      followedBy: followedBy,
    });

    const result = {
      idFollow: follow.props.idFollow,
      userId: follow.props.userId,
      followedBy: follow.props.followedBy,
    };

    res.status(201).send(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

followRouter.get("/follow/:idFollow", async (req: Request, res: Response) => {
  try {
    const idFollow = req.params.idFollow;

    const follow = await getFollow.execute({
      idFollow: idFollow,
    });

    const result = {
      follow: follow,
    };

    res.status(200).send(result.follow.props);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

followRouter.get("/feed/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const feed = await getFeed.execute({
      id: id,
    });

    const result = feed.map((elm) => elm.props);

    const arr = result.sort((a, b) => +b.createdAt - +a.createdAt);

    res.status(200).send(arr);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});
