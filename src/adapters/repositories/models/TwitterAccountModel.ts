export interface TwitterAccountModel {
    username: string;
    email: string;
    password: string;
    id: string;
    created_at: Date;
    updated_at?: Date;
}