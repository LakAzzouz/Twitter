require('dotenv').config()
const jwt = require('jsonwebtoken');

import express, {Request, Response} from "express";
import { Auth, RequestAuth } from "../middlewares/auth"
import { TwitterAccountPost } from "../../core/usescases/Post/TwitterPost";
import { TwitterGet } from "../../core/usescases/Post/TwitterGet";
import { InMemoryTwitterPostRepository } from "../../adapters/repositories/InMemoryTwitterPostRepository";
import { TwitterPost } from "../../core/entities/twitterPost";
import { TwitterGetTag } from "../../core/usescases/Post/TwitterGetByTag";

export const twitterPostMap = new Map<String, TwitterPost>();

const twitterPostRepository = new InMemoryTwitterPostRepository(twitterPostMap);
const twitterAccountPost = new TwitterAccountPost(twitterPostRepository);
const twitterGet = new TwitterGet(twitterPostRepository)
const getTag = new TwitterGetTag(twitterPostRepository)
const jwtSecret = process.env.JWT_SECRET

export const postRouter = express.Router();

postRouter.use(Auth) 
postRouter.post("/post", async (req: Request, res: Response) => {
    try{
        const authRequest = req as RequestAuth
        const userId = authRequest.user.id
        const body = req.body;
        const {username, text, tag} = body;

        const post = await twitterAccountPost.execute({
            userId: userId,
            username: username,
            post: text,
            tag: tag,
        })

        const result = {
            userId: post.props.userId,
            idPost: post.props.idPost,
            username: post.props.username,
            post: post.props.post,
            tag: post.props.tag,
            createdAt: post.props.createdAt,
        }

        const token = jwt.sign({id: post.props.idPost}, jwtSecret)

        res.status(201).send({result, token});

    }catch(error){
        if(error instanceof Error){
            res.status(400).send(error.message)
        }
    }
})

postRouter.get("/get_post", async (req: Request, res: Response) => {
    try{
        const authRequest = req as RequestAuth
        const idPost = authRequest.user.id

        const post = await twitterGet.execute({
            idPost: idPost
        })

        const result = {
            id: post.props.idPost,
            username: post.props.username,
            post: post.props.post,
            tag: post.props.tag
        }

        res.status(200).send(result)

    }catch(error){
        if(error instanceof Error){
            res.status(400).send(error.message)
        }
    }
})

postRouter.get("/tag", async (req: Request, res: Response) => {
    try{
        const body = req.body
        const {tag} = body

        const posts = await getTag.execute({
            tag: tag,
        })

        const result = posts.map(elm => elm.props)

        res.status(200).send(result)

    }catch(error){
        if(error instanceof Error){
            res.status(400).send(error.message)
        }
    }
})