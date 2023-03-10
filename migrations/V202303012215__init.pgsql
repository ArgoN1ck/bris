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
    "userId" uuid NOT NULL,
    "createdAt" timestamp NOT NULL DEFAULT now(),
    "updatedAt" timestamp NOT NULL DEFAULT now(),
    "deletedAt" timestamp DEFAULT NULL,
    CONSTRAINT "PK_PROFILES" PRIMARY KEY (id),
    CONSTRAINT "FK_PROFILES__USER_ID" FOREIGN KEY ("userId") REFERENCES "Users" ON DELETE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "IDX_PROFILES__USERID" ON "Profiles" ("userId");

CREATE TABLE IF NOT EXISTS "Articles" (
    id uuid NOT NULL DEFAULT uuid_generate_v4 (),
    slug varchar(255) NOT NULL,
    title varchar(255) NOT NULL,
    description text NOT NULL DEFAULT '',
    body text NOT NULL DEFAULT '',
    "favoritesCount" integer NOT NULL DEFAULT 0,
    "authorId" uuid,
    "createdAt" timestamp NOT NULL DEFAULT now(),
    "updatedAt" timestamp NOT NULL DEFAULT now(),
    "deletedAt" timestamp DEFAULT NULL,
    CONSTRAINT "PK_ARTICLES" PRIMARY KEY (id),
    CONSTRAINT "FK_ARTICLES__AUTHOR_ID" FOREIGN KEY ("authorId") REFERENCES "Profiles" ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS "IDX_ARTICLES__TITLE" ON "Articles" (title);
CREATE UNIQUE INDEX IF NOT EXISTS "IDX_ARTICLES__SLUG" ON "Articles" (slug);

CREATE TABLE IF NOT EXISTS "Comments" (
    id uuid NOT NULL DEFAULT uuid_generate_v4 (),
    body text NOT NULL,
    "articleId" uuid NOT NULL,
    "authorId" uuid NOT NULL,
    "createdAt" timestamp NOT NULL DEFAULT now(),
    "updatedAt" timestamp NOT NULL DEFAULT now(),
    "deletedAt" timestamp DEFAULT NULL,
    CONSTRAINT "PK_COMMENTS" PRIMARY KEY (id),
    CONSTRAINT "FK_COMMENTS__ARTICLE_ID" FOREIGN KEY ("articleId") REFERENCES "Articles" ON DELETE CASCADE,
    CONSTRAINT "FK_COMMENTS__AUTHOR_ID" FOREIGN KEY ("authorId") REFERENCES "Profiles" ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Favorites" (
    "profileId" uuid NOT NULL,
    "articleId" uuid NOT NULL,
    "createdAt" timestamp NOT NULL DEFAULT now(),
    CONSTRAINT "PK_FAVORITES" PRIMARY KEY ("profileId", "articleId"),
    CONSTRAINT "FK_FAVORITES__PROFILE_ID" FOREIGN KEY ("profileId") REFERENCES "Profiles" ON DELETE CASCADE,
    CONSTRAINT "FK_FAVORITES__ARTICLE_ID" FOREIGN KEY ("articleId") REFERENCES "Articles" ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "IDX_FAVORITES__PROFILE_ID" ON "Favorites" ("profileId");

CREATE INDEX IF NOT EXISTS "IDX_FAVORITES__ARTICLE_ID" ON "Favorites" ("articleId");

CREATE TABLE IF NOT EXISTS "Follows" (
    "followerId" uuid NOT NULL,
    "followingId" uuid NOT NULL,
    CONSTRAINT "PK_FOLLOWS" PRIMARY KEY ("followerId", "followingId"),
    CONSTRAINT "FK_FOLLOWS__FOLLOWER_ID" FOREIGN KEY ("followerId") REFERENCES "Profiles",
    CONSTRAINT "FK_FOLLOWS__FOLLOWING_ID" FOREIGN KEY ("followingId") REFERENCES "Profiles"
);

