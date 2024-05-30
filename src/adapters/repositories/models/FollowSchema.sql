CREATE TABLE follows (
    id_follow VARCHAR(100) UNIQUE NOT NULL,
    followed_by VARCHAR(100) NOT NULL,
    user_id VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP 
);