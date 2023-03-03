CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "Users" (
    id uuid NOT NULL DEFAULT uuid_generate_v4 (),
    username varchar(100) NOT NULL,
    email varchar(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    "createdAt" timestamp NOT NULL DEFAULT now(),
    "updatedAt" timestamp NOT NULL DEFAULT now(),
    "deletedAt" timestamp DEFAULT NULL,
    CONSTRAINT "PK_USERS" PRIMARY KEY (id)
);
CREATE UNIQUE INDEX IF NOT EXISTS "IDX_USERS__USERNAME" ON "Users" (username);
CREATE UNIQUE INDEX IF NOT EXISTS "IDX_USERS__EMAIL" ON "Users" (email);


CREATE TABLE IF NOT EXISTS "Profiles" (
    id uuid NOT NULL DEFAULT uuid_generate_v4 (),
    bio text NOT NULL DEFAULT '',
    image varchar(255) NOT NULL DEFAULT '',
    "userId" uuid UNIQUE NOT NULL,
    "createdAt" timestamp NOT NULL DEFAULT now(),
    "updatedAt" timestamp NOT NULL DEFAULT now(),
    "deletedAt" timestamp DEFAULT NULL,
    CONSTRAINT "PK_PROFILES" PRIMARY KEY (id),
    CONSTRAINT "FK_PROFILES__USER_ID" FOREIGN KEY ("userId") REFERENCES "Users" ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Tags" (
    id uuid NOT NULL DEFAULT uuid_generate_v4 (),
    title varchar(255) NOT NULL,
    "createdAt" timestamp NOT NULL DEFAULT now(),
    "updatedAt" timestamp NOT NULL DEFAULT now(),
    "deletedAt" timestamp DEFAULT NULL,
    CONSTRAINT "PK_TAGS" PRIMARY KEY (id)
);

CREATE INDEX IF NOT EXISTS "IDX_TAGS__TITLE" ON "Tags" (title);

CREATE TABLE IF NOT EXISTS "Articles" (
    id uuid NOT NULL DEFAULT uuid_generate_v4 (),
    title varchar(255) NOT NULL,
    description text NOT NULL DEFAULT '',
    body text NOT NULL DEFAULT '',
    "favoritesCount" integer NOT NULL DEFAULT 0,
    "authorId" uuid,
    "createdAt" timestamp NOT NULL DEFAULT now(),
    "updatedAt" timestamp NOT NULL DEFAULT now(),
    "deletedAt" timestamp DEFAULT NULL,
    CONSTRAINT "PK_ARTICLES" PRIMARY KEY (id),
    CONSTRAINT "FK_ARTICLES__AUTHOR_ID" FOREIGN KEY ("authorId") REFERENCES "Users" ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS "IDX_ARTICLES__TITLE" ON "Articles" (title);

CREATE TABLE IF NOT EXISTS "Favorites" (
    "userId" uuid NOT NULL,
    "articleId" uuid NOT NULL,
    "createdAt" timestamp NOT NULL DEFAULT now(),
    "updatedAt" timestamp NOT NULL DEFAULT now(),
    CONSTRAINT "PK_FAVORITES" PRIMARY KEY ("userId", "articleId"),
    CONSTRAINT "FK_FAVORITES__USER_ID" FOREIGN KEY ("userId") REFERENCES "Users" ON DELETE CASCADE,
    CONSTRAINT "FK_FAVORITES__ARTICLE_ID" FOREIGN KEY ("articleId") REFERENCES "Articles" ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "IDX_FAVORITES__USER_ID" ON "Favorites" ("userId");

CREATE INDEX IF NOT EXISTS "IDX_FAVORITES__ARTICLE_ID" ON "Favorites" ("articleId");

CREATE TABLE IF NOT EXISTS "Follows" (
    "followerId" uuid NOT NULL,
    "followingId" uuid NOT NULL,
    "createdAt" timestamp NOT NULL DEFAULT now(),
    "updatedAt" timestamp NOT NULL DEFAULT now(),
    CONSTRAINT "PK_FOLLOWS" PRIMARY KEY ("followerId", "followingId"),
    CONSTRAINT "FK_FOLLOWS__FOLLOWER_ID" FOREIGN KEY ("followerId") REFERENCES "Users" ON DELETE CASCADE,
    CONSTRAINT "FK_FOLLOWS__FOLLOWING_ID" FOREIGN KEY ("followingId") REFERENCES "Users" ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "IDX_FOLLOWS__FOLLOWER_ID" ON "Follows" ("followerId");

CREATE INDEX IF NOT EXISTS "IDX_FOLLOWS__FOLLOWING_ID" ON "Follows" ("followingId");

