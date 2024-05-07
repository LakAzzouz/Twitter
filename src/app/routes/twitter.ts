import express, {Request, Response} from "express";
import {v4} from "uuid";
import { TwitterAccount } from "../../core/entities/twitterAccount";
import { CreateTwitterAccount } from "../../core/usescases/Account/CreateTwitterAccount";
import { BCryptGateway } from "../../adapters/gateway/BcryptGateway";
import { SignInTwitterAccount } from "../../core/usescases/Account/SignInTwitterAccount";
import { TwitterAccountPost } from "../../core/usescases/Post/TwitterPost";
import { InMemoryTwitterPostRepository } from "../../adapters/repositories/InMemoryTwitterPostRepository";
import { TwitterPost } from "../../core/entities/twitterPost";
import { TwitterGet } from "../../core/usescases/Post/TwitterGet";
import { Follow } from "../../core/entities/follow";
import { FollowAccount } from "../../core/usescases/Follow/FollowAccount";
import { InMemoryFollowRepository } from "../../adapters/repositories/InMemoryFollow";
import { InMemoryTwitterAccountRepository } from "../../adapters/repositories/InMemoryTwitterAccountRepository";
import { GetFollow } from "../../core/usescases/Follow/GetFollow";
import { GetFeed } from "../../core/usescases/Follow/GetFeed";
import { TwitterGetTag } from "../../core/usescases/Post/TwitterGetTag";

export const twitterRouteur = express.Router();

export const twitterAccountMap = new Map<String, TwitterAccount>();
export const twitterPostMap = new Map<String, TwitterPost>();
export const followMap = new Map<String, Follow>();
const twitterRepository = new InMemoryTwitterAccountRepository(twitterAccountMap);
const twitterPostRepository = new InMemoryTwitterPostRepository(twitterPostMap);
const followRepository = new InMemoryFollowRepository(followMap)
const bcrypt = new BCryptGateway();
const createTwitterAccount = new CreateTwitterAccount(bcrypt, twitterRepository);
const signInTwitterAccount = new SignInTwitterAccount(bcrypt, twitterRepository);
const twitterAccountPost = new TwitterAccountPost(twitterPostRepository);
const twitterGet = new TwitterGet(twitterPostRepository)
const follower = new FollowAccount(followRepository, twitterRepository)
const getFollow = new GetFollow(followRepository)
const getFeed = new GetFeed(followRepository, twitterPostRepository)
const getTag = new TwitterGetTag(twitterPostRepository)

twitterRouteur.post("/signup", async (req: Request, res: Response) => {
    try{
        const body = req.body;
        const {username, email, password} = body;

        const twitterAccount = await createTwitterAccount.execute({
            username: username,
            email: email,
            password: password
        })

        const result = {
            id: twitterAccount.props.id,
            username: twitterAccount.props.username,
            email: twitterAccount.props.email,
            createdAt: twitterAccount.props.createdAt // à formater
        }

        res.status(201).send(result);

    }catch(error){
        if(error instanceof Error){
            res.status(400).send(error.message)
        }
    }   
})

twitterRouteur.post("/signin/:idAccount", async (req: Request, res: Response) => {
    try{
        const body = req.body;
        const {username, email, password} = body;

        const twitterAccount = await signInTwitterAccount.execute({
            username: username,
            email: email,
            password: password
        })

        const result = `Welcome to Twitter ${twitterAccount.props.username}`;

        res.status(201).send(result);

    }catch(error){
        if(error instanceof Error){
            res.status(400).send(error.message)
        }
    }
})

twitterRouteur.post("/post/:userId", async (req: Request, res: Response) => {
    try{
        const userId = req.params.userId
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

        res.status(201).send(result);

    }catch(error){
        if(error instanceof Error){
            res.status(400).send(error.message)
        }
    }
})

twitterRouteur.get("/getPost/:idPost", async (req: Request, res: Response) => {
    try{
        const idPost = req.params.idPost

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

twitterRouteur.post("/follow", async (req: Request, res: Response) => {
    try{
        const idFollow = v4()
        const body = req.body;
        const {userId, followedBy} = body;

        const follow = await follower.execute({
            id: idFollow,
            userId: userId,
            followedBy: followedBy
        })

        const result = {
            idFollow: follow.props.idFollow,
            userId: follow.props.userId,
            followedBy: follow.props.followedBy
        }

        res.status(201).send(result)

    }catch(error){
        if(error instanceof Error){
            res.status(400).send(error.message)
        }
    }
})

twitterRouteur.get("/follow/:idFollow", async (req: Request, res: Response) => {
    try{
        const idFollow = req.params.idFollow

        const follow = await getFollow.execute({
            idFollow: idFollow
        })

        const result = {
            follow: follow
        }
        res.status(200).send(result.follow.props)

    }catch(error){
        if(error instanceof Error){
            res.status(400).send(error.message)
        }
    }
})

twitterRouteur.get("/feed/:id", async (req: Request, res: Response) => {
    try{
        const id = req.params.id

        const feed = await getFeed.execute({
            id: id
        })

        const result = feed.map(elm => elm.props)

        const arr = result.sort((a, b) => +b.createdAt - +a.createdAt)

        res.status(200).send(arr)

    }catch(error){
        if(error instanceof Error){
            res.status(400).send(error.message)
        }
    }
})

twitterRouteur.get("/tag/:idUser", async (req: Request, res: Response) => {
    try{
        const idUser = req.params.idUser
        const body = req.body
        const {tag} = body

        const post = await getTag.execute({
            tag: tag
        })

        const result = {
            tag: post.props.post
        }

        res.status(200).send(result)

    }catch(error){
        if(error instanceof Error){
            res.status(400).send(error.message)
        }
    }
})