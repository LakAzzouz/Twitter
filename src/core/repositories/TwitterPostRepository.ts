import { TwitterPost } from "../entities/twitterPost"

export interface TwitterPostRepository {

    save(twitterPost: TwitterPost): Promise<TwitterPost>

    getById(id: string): Promise<TwitterPost>

    getByFollowedIds(ids: string[]): Promise<TwitterPost[]>
}