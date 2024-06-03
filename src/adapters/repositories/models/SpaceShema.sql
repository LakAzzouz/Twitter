CREATE TABLE space (
    space_id VARCHAR(100) UNIQUE NOT NULL,
    speaker VARCHAR(100) NOT NULL,
    listener VARCHAR(100) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)