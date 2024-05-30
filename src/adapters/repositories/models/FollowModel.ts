export interface FollowModel {
  id_follow: string;
  followed_by: string;
  user_id: string;
  created_at: Date;
  updated_at?: Date;
}
