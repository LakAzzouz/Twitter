CREATE TABLE twitter_account (
    username VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100),
    id VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);