export interface TwitterPostModel {
  user_id: string;
  id_post: string;
  username: string;
  post: string;
  tag: string;
  created_at: Date;
  updated_at?: Date;
}
