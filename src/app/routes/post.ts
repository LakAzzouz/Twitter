require("dotenv").config();
const jwt = require("jsonwebtoken");

import express, { Request, Response } from "express";
import { Auth, RequestAuth } from "../middlewares/auth";
import { TwitterPost } from "../../core/entities/twitterPost";
import { CreateTwitterPost } from "../../core/usecases/Post/CreateTwitterPost";
import { TwitterGet } from "../../core/usecases/Post/GetTwitterPostById";
import { TwitterPostGetByTag } from "../../core/usecases/Post/TwitterPostGetByTag";
import { InMemoryTwitterPostRepository } from "../../adapters/repositories/inMemory/InMemoryTwitterPostRepository";

export const twitterPostMap = new Map<String, TwitterPost>();

const twitterPostRepository = new InMemoryTwitterPostRepository(twitterPostMap);
const twitterAccountPost = new CreateTwitterPost(twitterPostRepository);
const twitterGet = new TwitterGet(twitterPostRepository);
const getTag = new TwitterPostGetByTag(twitterPostRepository);
const jwtSecret = process.env.JWT_SECRET;

export const postRouter = express.Router();

postRouter.use(Auth);
postRouter.post("/post", async (req: Request, res: Response) => {
  try {
    const authRequest = req as RequestAuth;
    const userId = authRequest.user.id;
    const body = req.body;
    const { username, text, tag } = body;

    const post = await twitterAccountPost.execute({
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
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

postRouter.get("/post/:idPost", async (req: Request, res: Response) => {
  try {
    const idPost = req.params.idPost;

    const post = await twitterGet.execute({
      idPost: idPost,
    });

    const result = {
      id: post.props.idPost,
      username: post.props.username,
      post: post.props.post,
      tag: post.props.tag,
    };

    res.status(200).send(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

postRouter.get("/tag", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const { tag } = body;

    const posts = await getTag.execute({
      tag: tag,
    });

    const result = posts.map((elm) => elm.props);

    res.status(200).send(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});
