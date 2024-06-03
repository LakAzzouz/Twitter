CREATE TABLE twitter_post (
    user_id VARCHAR(100) UNIQUE NOT NULL,
    id_post VARCHAR(100) UNIQUE NOT NULL,
    username VARCHAR(100) ,
    post VARCHAR(100) ,
    tag VARCHAR(100) ,
    created_at TIMESTAMP ,
    updated_at TIMESTAMP
);