CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
    id uuid NOT NULL DEFAULT uuid_generate_v4 (),
    username varchar(50) NOT NULL,
    email varchar(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    "createdAt" timestamp NOT NULL DEFAULT now(),
    "updatedAt" timestamp NOT NULL DEFAULT now(),
    CONSTRAINT "PK_USERS" PRIMARY KEY (id)
);

CREATE INDEX IF NOT EXISTS "IDX_USERS__USERNAME" ON users (username);

CREATE UNIQUE INDEX IF NOT EXISTS "IDX_USERS__USERNAME_USERS__EMAIL" ON users (username, email);

CREATE TABLE IF NOT EXISTS profiles (
    id uuid NOT NULL DEFAULT uuid_generate_v4 (),
    bio text NOT NULL DEFAULT '',
    image varchar(50) NOT NULL DEFAULT '',
    "userId" uuid UNIQUE NOT NULL,
    "createdAt" timestamp NOT NULL DEFAULT now(),
    "updatedAt" timestamp NOT NULL DEFAULT now(),
    CONSTRAINT "PK_PROFILES" PRIMARY KEY (id),
    CONSTRAINT "FK_PROFILES__USER_ID" FOREIGN KEY ("userId") REFERENCES users ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tags (
    id uuid NOT NULL DEFAULT uuid_generate_v4 (),
    title varchar(50) NOT NULL,
    "createdAt" timestamp NOT NULL DEFAULT now(),
    "updatedAt" timestamp NOT NULL DEFAULT now(),
    CONSTRAINT "PK_TAGS" PRIMARY KEY (id)
);

CREATE INDEX IF NOT EXISTS "IDX_TAGS__TITLE" ON tags (title);

CREATE TABLE IF NOT EXISTS articles (
    id uuid NOT NULL DEFAULT uuid_generate_v4 (),
    title varchar(50) NOT NULL,
    description text NOT NULL DEFAULT '',
    body text NOT NULL DEFAULT '',
    "favoritesCount" integer NOT NULL DEFAULT 0,
    "authorId" uuid,
    "createdAt" timestamp NOT NULL DEFAULT now(),
    "updatedAt" timestamp NOT NULL DEFAULT now(),
    CONSTRAINT "PK_ARTICLES" PRIMARY KEY (id),
    CONSTRAINT "FK_ARTICLES__AUTHOR_ID" FOREIGN KEY ("authorId") REFERENCES users ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS "IDX_ARTICLES__TITLE" ON articles (title);

CREATE TABLE IF NOT EXISTS favorites (
    "userId" uuid NOT NULL,
    "articleId" uuid NOT NULL,
    "createdAt" timestamp NOT NULL DEFAULT now(),
    "updatedAt" timestamp NOT NULL DEFAULT now(),
    CONSTRAINT "PK_FAVORITES" PRIMARY KEY ("userId", "articleId"),
    CONSTRAINT "FK_FAVORITES__USER_ID" FOREIGN KEY ("userId") REFERENCES users ON DELETE CASCADE,
    CONSTRAINT "FK_FAVORITES__ARTICLE_ID" FOREIGN KEY ("articleId") REFERENCES articles ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "IDX_FAVORITES__USER_ID" ON favorites ("userId");

CREATE INDEX IF NOT EXISTS "IDX_FAVORITES__ARTICLE_ID" ON favorites ("articleId");

CREATE TABLE IF NOT EXISTS follows (
    "followerId" uuid NOT NULL,
    "followingId" uuid NOT NULL,
    "createdAt" timestamp NOT NULL DEFAULT now(),
    "updatedAt" timestamp NOT NULL DEFAULT now(),
    CONSTRAINT "PK_FOLLOWS" PRIMARY KEY ("followerId", "followingId"),
    CONSTRAINT "FK_FOLLOWS__FOLLOWER_ID" FOREIGN KEY ("followerId") REFERENCES users ON DELETE CASCADE,
    CONSTRAINT "FK_FOLLOWS__FOLLOWING_ID" FOREIGN KEY ("followingId") REFERENCES users ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "IDX_FOLLOWS__FOLLOWER_ID" ON follows ("followerId");

CREATE INDEX IF NOT EXISTS "IDX_FOLLOWS__FOLLOWING_ID" ON follows ("followingId");

