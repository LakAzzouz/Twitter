import { Follow } from "../entities/follow";

export interface FollowRepository {

    save(follow: Follow): Promise<Follow> 

    getById(id: string): Promise<Follow> 

    getFollowedIds(followerId: string): Promise<string[]>
}