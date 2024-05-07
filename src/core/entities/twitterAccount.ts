import {v4} from "uuid";

type TwitterAccountProperties = {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt?: Date
}

export class TwitterAccount {
    props: TwitterAccountProperties
    
    constructor(twitterAccountProperties: TwitterAccountProperties){
        this.props = twitterAccountProperties
    }

    static create(props: {username: string, email: string, password: string}): TwitterAccount{
        const twitterAccount = new TwitterAccount({
            id: v4(),
            username: props.username,
            email: props.email.trim().toLowerCase(),
            password: props.password,
            createdAt: new Date(),
        })
        return twitterAccount
    }
}